import numpy as np
import pandas as pd
import datetime
from sklearn import preprocessing
from tensorflow.keras import Sequential
from tensorflow.keras import layers
from tensorflow.keras import callbacks
from tensorflow.keras import regularizers
from tensorflow.keras import losses
import time
import ta
import tensorflow as tf
from alpha_vantage.timeseries import TimeSeries  # Install via: pip install alpha-vantage

class StockPredictor:
    def __init__(self, symbol="XOM", sequence_length=150, api_key="YOUR_API_KEY_HERE"):
        self.symbol = symbol
        self.sequence_length = sequence_length
        self.scaler = preprocessing.MinMaxScaler(feature_range=(0, 1))
        self.target_scaler = preprocessing.MinMaxScaler(feature_range=(0, 1))
        self.ts = TimeSeries(key=api_key, output_format='pandas')  # Alpha Vantage API client

    def fetch_historical_data(self, interval="1min"):
        """Fetch maximum available historical 1-minute data."""
        try:
            data, _ = self.ts.get_intraday(symbol=self.symbol, interval=interval, outputsize='full')
            data = data.rename(columns={
                '1. open': 'Open', '2. high': 'High', '3. low': 'Low', 
                '4. close': 'Close', '5. volume': 'Volume'
            })
            data.index.name = 'Date'
            return data  # Approx 30 days of 1-min data in free tier
        except Exception as e:
            print(f"Error fetching historical data: {e}")
            return pd.DataFrame()

    def fetch_live_data(self, interval="1min"):
        """Fetch recent 1-minute data for real-time predictions."""
        try:
            data, _ = self.ts.get_intraday(symbol=self.symbol, interval=interval, outputsize='compact')
            data = data.rename(columns={
                '1. open': 'Open', '2. high': 'High', '3. low': 'Low', 
                '4. close': 'Close', '5. volume': 'Volume'
            })
            data.index.name = 'Date'
            return data.tail(self.sequence_length * 2)  # Enough data for sequence
        except Exception as e:
            print(f"Error fetching live data: {e}")
            return pd.DataFrame()

    def add_technical_indicators(self, df):
        """Add technical indicators to the dataframe."""
        df_copy = df.copy()
        df_copy['SMA'] = ta.trend.sma_indicator(df_copy['Close'], window=20)
        df_copy['RSI'] = ta.momentum.rsi(df_copy['Close'], window=14)
        df_copy['MACD'] = ta.trend.macd(df_copy['Close']).fillna(0)
        df_copy['Bollinger_Upper'] = ta.volatility.bollinger_hband(df_copy['Close'])
        df_copy['Bollinger_Lower'] = ta.volatility.bollinger_lband(df_copy['Close'])
        df_copy['Volatility'] = df_copy['High'] - df_copy['Low']
        df_copy['Volume_Change'] = df_copy['Volume'].pct_change()
        return df_copy.fillna(method='ffill').fillna(0)

    def prepare_data(self):
        """Prepare historical data for training."""
        try:
            hist_data = self.fetch_historical_data()
            if hist_data.empty:
                raise ValueError(f"No data found for symbol: {self.symbol}")

            hist_data = self.add_technical_indicators(hist_data)
            self.feature_columns = hist_data.columns.tolist()
            close_prices = hist_data['Close'].values

            feature_data = hist_data.drop('Close', axis=1)
            scaled_feature_data = self.scaler.fit_transform(feature_data)
            scaled_close_prices = self.target_scaler.fit_transform(close_prices.reshape(-1, 1))

            X, y = [], []
            for i in range(self.sequence_length, len(scaled_feature_data)):
                X.append(scaled_feature_data[i - self.sequence_length:i])
                y.append(scaled_close_prices[i, 0])

            return np.array(X), np.array(y), self.feature_columns
        except Exception as e:
            print(f"Error in data preparation: {e}")
            return None, None, None

    def create_model(self, num_features):
        """Create the LSTM model."""
        model = Sequential([
            layers.LSTM(128, return_sequences=True, input_shape=(self.sequence_length, num_features)),
            layers.Dropout(0.3),
            layers.LSTM(64, return_sequences=False),
            layers.Dropout(0.3),
            layers.Dense(32),
            layers.Dense(1)
        ])
        model.compile(optimizer='adam', loss=losses.Huber(), metrics=['mse'])
        return model

    def train_model(self):
        """Train the model with historical data."""
        try:
            X, y, feature_columns = self.prepare_data()
            if X is None:
                return None, None

            split_idx = int(len(X) * 0.8)
            X_train, X_val = X[:split_idx], X[split_idx:]
            y_train, y_val = y[:split_idx], y[split_idx:]

            model = self.create_model(X.shape[2])
            early_stopping = callbacks.EarlyStopping(monitor='val_loss', patience=20, restore_best_weights=True)

            model.fit(
                X_train, y_train,
                validation_data=(X_val, y_val),
                epochs=100,
                batch_size=32,
                callbacks=[early_stopping],
                verbose=1
            )
            return model, feature_columns
        except Exception as e:
            print(f"Error in model training: {e}")
            return None, None

    def predict_next_movement(self):
        """Predict real-time intraday movements."""
        try:
            model, feature_columns = self.train_model()
            if model is None:
                print("Model training failed. Exiting...")
                return

            print(f"Starting real-time predictions for {self.symbol}")
            while True:
                try:
                    live_data = self.fetch_live_data()
                    if len(live_data) < self.sequence_length:
                        print("Insufficient live data")
                        time.sleep(60)
                        continue

                    live_data = self.add_technical_indicators(live_data)
                    live_features = live_data.drop('Close', axis=1)
                    scaled_live_features = self.scaler.transform(live_features)
                    X_pred = np.array([scaled_live_features[-self.sequence_length:]])

                    pred_scaled = model.predict(X_pred)
                    predicted_price = self.target_scaler.inverse_transform(pred_scaled)[0][0]
                    current_price = live_data['Close'].iloc[-1]

                    threshold = 0.001 * current_price
                    if predicted_price > current_price + threshold:
                        action = "BUY"
                    elif predicted_price < current_price - threshold:
                        action = "SELL"
                    else:
                        action = "HOLD"

                    print(f"\nTimestamp: {datetime.datetime.now()}")
                    print(f"Current Price: {current_price:.2f}")
                    print(f"Predicted Price: {predicted_price:.2f}")
                    print(f"Action: {action}")
                    time.sleep(60)  # Fetch every 60 seconds to respect rate limits

                except Exception as e:
                    print(f"Prediction error: {e}")
                    time.sleep(60)
        except Exception as e:
            print(f"Fatal error in prediction loop: {e}")

if __name__ == "__main__":
    # Replace "YOUR_API_KEY_HERE" with your Alpha Vantage API key
    predictor = StockPredictor("XOM", api_key="QFNO6LN0DCT9BNMG")
    predictor.predict_next_movement()