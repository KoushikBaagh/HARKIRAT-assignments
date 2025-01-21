import yfinance as yf
import numpy as np
import pandas as pd
import datetime
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.layers import Dropout
from tensorflow.keras.regularizers import L1L2
import time

# --- 1. Change to Nifty 50 Options ---
def fetch_live_data(symbol="ONGC.NS", interval="1m"):  # Example Futures ticker, adjust as needed
    stock = yf.Ticker(symbol)
    data = stock.history(period="5d", interval=interval)
    return data['Close']

# --- 2. Gather All Data (Practical Considerations) ---
# def prepare_data(symbol="ONGC.NS", sequence_length=150):
#     try:
#         # Fetch all available historical data
#         hist_data = yf.download(symbol, start="1990-01-01", end=datetime.datetime.now().strftime('%Y-%m-%d')) # Adjust start date if needed
#         prices = hist_data['Close']

#         scaler = MinMaxScaler(feature_range=(0, 1))
#         scaled_data = scaler.fit_transform(prices.values.reshape(-1, 1))

#         X, y = [], []
#         for i in range(sequence_length, len(scaled_data)):
#             X.append(scaled_data[i-sequence_length:i, 0])
#             y.append(scaled_data[i, 0])

#         X = np.array(X)
#         y = np.array(y)
#         X = np.reshape(X, (X.shape[0], X.shape[1], 1))
#         return X, y, scaler
#     except Exception as e:
#         print(f"Error fetching or preparing data: {e}")
#         return None, None, None

def prepare_data(symbol="ONGC.NS", sequence_length=150):
    try:
        # Fetch all available historical data
        hist_data = yf.download(symbol)
        if hist_data.empty:
            raise ValueError(f"No data found for symbol: {symbol}")

        prices = hist_data['Close']

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
    except Exception as e:
        print(f"Error fetching or preparing data: {e}")
        return None, None, None

def create_model(sequence_length):
    model = Sequential([
        LSTM(100, return_sequences=True, input_shape=(sequence_length, 1), kernel_regularizer=L1L2(l1=1e-5, l2=1e-5)), # Added L1L2 regularization
        Dropout(0.2), # Added dropout
        LSTM(100, return_sequences=True, kernel_regularizer=L1L2(l1=1e-5, l2=1e-5)), # Added L1L2 regularization
        Dropout(0.2), # Added dropout
        LSTM(50, return_sequences=False, kernel_regularizer=L1L2(l1=1e-5, l2=1e-5)), # Added L1L2 regularization
        Dense(50, kernel_regularizer=L1L2(l1=1e-5, l2=1e-5)), # Added L1L2 regularization
        Dense(1)
    ])
    model.compile(optimizer='adam', loss='mean_squared_error')
    return model

# --- 3. Training and Learning with Strategies (Conceptual & Limited Implementation) ---
#  Directly coding and "learning" all trading strategies, especially subjective ones like SMC, is extremely complex.
#  This code focuses on learning patterns from price data. Incorporating SMC would require:
#  - Defining specific SMC rules programmatically (challenging due to subjectivity).
#  - Engineering features based on SMC concepts (e.g., identifying order blocks, liquidity sweeps).
#  - Potentially using different model architectures or approaches.
#  For now, we'll enhance the LSTM model and focus on price patterns.

def train_model(symbol="ONGC.NS"):
    X, y, scaler = prepare_data(symbol)
    if X is None:
        return None, None, None

    # Split data into training and validation sets
    split_ratio = 0.8
    split_index = int(len(X) * split_ratio)
    X_train, X_val = X[:split_index], X[split_index:]
    y_train, y_val = y[:split_index], y[split_index:]

    sequence_length = X.shape[1]
    model = create_model(sequence_length)

    # Early stopping to prevent overfitting
    early_stopping = EarlyStopping(monitor='val_loss', patience=15, restore_best_weights=True)

    model.fit(X_train, y_train, batch_size=32, epochs=150,
              validation_data=(X_val, y_val), callbacks=[early_stopping]) # Added validation data and early stopping
    return model, scaler, sequence_length
# --- 3 & 4. Prediction and Guidance (Simplified) ---
def predict_next_movement(symbol="ONGC.NS"):
    model, scaler, sequence_length = train_model(symbol)
    if model is None:
        return

    while True:
        try:
            # Fetch latest data
            latest_data = fetch_live_data(symbol)
            if latest_data.empty or len(latest_data) < sequence_length:
                print("Not enough data points...")
                time.sleep(60)
                continue

            # Prepare latest data for prediction
            scaled_data = scaler.transform(latest_data[-sequence_length:].values.reshape(-1, 1))
            X_latest = np.array([scaled_data])
            X_latest = np.reshape(X_latest, (X_latest.shape[0], X_latest.shape[1], 1))

            # Make prediction
            predicted_scaled = model.predict(X_latest)
            predicted_price = scaler.inverse_transform(predicted_scaled)[0][0]
            current_price = latest_data.iloc[-1]

            # --- Simplified Buy/Sell Logic (Needs Significant Improvement) ---
            threshold = 0.001 * current_price # Example: 0.1% change as a threshold
            if predicted_price > current_price + threshold:
                action = "BUY"
                amount = 1  # Placeholder, needs sophisticated position sizing
            elif predicted_price < current_price - threshold:
                action = "SELL"
                amount = 1  # Placeholder
            else:
                action = "HOLD"
                amount = 0

            print(f"Current Price: {current_price:.2f}")
            print(f"Predicted Price: {predicted_price:.2f}")
            print(f"Action: {action}, Amount: {amount}")

            time.sleep(60)  # Wait for 1 minute
        except Exception as e:
            print(f"Error during prediction: {e}")
            time.sleep(60)

# --- 4. Compatibility for VS Code and Google Colab ---
# The code as written should be compatible with both VS Code and Google Colab
# as long as the necessary libraries are installed (yfinance, numpy, pandas, scikit-learn, tensorflow).
# In Colab, you might need to install them using:
# !pip install yfinance numpy pandas scikit-learn tensorflow

if __name__ == "__main__":
    # --- 1. Choose your Nifty 50 Option ticker ---
    # Be VERY specific with the ticker. Examples:
    # - NIFTY5024JUN22000CE.NS (Call Option, June 2024, Strike 22000)
    # - NIFTY5024JUN21500PE.NS (Put Option, June 2024, Strike 21500)
    # - ONGC.NS (Nifty 50 Futures, June 2024)
    option_symbol = "ONGC.NS"  # Replace with your desired option ticker
    predict_next_movement(symbol=option_symbol)