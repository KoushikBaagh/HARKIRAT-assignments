import yfinance as yf
import numpy as np
import pandas as pd
import datetime
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
import time

def fetch_live_data(symbol="HDFCBANK.NS", interval="1m"):
    stock = yf.Ticker(symbol)
    data = stock.history(period="5d", interval=interval)
    return data['Close']

def prepare_data(prices, sequence_length=60):
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(prices.values.reshape(-1, 1))

    X, y = [], []
    for i in range(sequence_length, len(scaled_data)):
        X.append(scaled_data[i-sequence_length:i, 0])
        y.append(scaled_data[i, 0])

    X = np.array(X)
    y = np.array(y)
    X = np.reshape(X, (X.shape[0], X.shape[1], 1))
    return X, y, scaler

def create_model(sequence_length):
    model = Sequential([
        LSTM(50, return_sequences=True, input_shape=(sequence_length, 1)),
        LSTM(50, return_sequences=False),
        Dense(25),
        Dense(1)
    ])
    model.compile(optimizer='adam', loss='mean_squared_error')
    return model

def train_model():
    # Get historical data for training
    symbol = "HDFCBANK.NS"
    hist_data = yf.download(symbol, start="1994-01-01", end=datetime.datetime.now().strftime('%Y-%m-%d'))
    prices = hist_data['Close']

    # Prepare training data
    sequence_length = 60
    X, y, scaler = prepare_data(prices, sequence_length)

    # Create and train model
    model = create_model(sequence_length)
    model.fit(X, y, batch_size=32, epochs=50, validation_split=0.1)

    return model, scaler, sequence_length

def predict_next_movement():
    model, scaler, sequence_length = train_model()

    while True:
        # Fetch latest data
        latest_data = fetch_live_data()
        if len(latest_data) < sequence_length:
            print("Not enough data points")
            continue

        # Prepare latest data for prediction
        scaled_data = scaler.transform(latest_data[-sequence_length:].values.reshape(-1, 1))
        X_latest = np.array([scaled_data])
        X_latest = np.reshape(X_latest, (X_latest.shape[0], X_latest.shape[1], 1))

        # Make prediction
        predicted_scaled = model.predict(X_latest)
        predicted_price = scaler.inverse_transform(predicted_scaled)[0][0]
        current_price = latest_data.iloc[-1]

        movement = "UP" if predicted_price > current_price else "DOWN"
        print(f"Current Price: {current_price:.2f}")
        print(f"Predicted Price: {predicted_price:.2f}")
        print(f"Predicted Movement: {movement}")

        time.sleep(60)  # Wait for 1 minute before next prediction

if __name__ == "__main__":
    predict_next_movement()