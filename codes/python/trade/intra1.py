import yfinance as yf
import numpy as np
import pandas as pd
import datetime
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.regularizers import L1L2
from tensorflow.keras.losses import Huber
import time
import ta
import tensorflow as tf

class StockPredictor:
    def __init__(self, symbol="ONGC.NS", sequence_length=150):
        self.symbol = symbol
        self.sequence_length = sequence_length
        self.scaler = MinMaxScaler(feature_range=(0, 1))
        
    def fetch_live_data(self, interval="1m"):
        try:
            stock = yf.Ticker(self.symbol)
            data = stock.history(start="1996-01-01", end=None, interval=interval)
            return data
        except Exception as e:
            print(f"Error fetching live data: {e}")
            return pd.DataFrame()
    
    def add_technical_indicators(self, df):
        df_copy = df.copy()
        
        # Technical indicators
        df_copy['SMA'] = ta.trend.sma_indicator(df_copy['Close'], window=20)
        df_copy['RSI'] = ta.momentum.rsi(df_copy['Close'], window=14)
        df_copy['MACD'] = ta.trend.macd(df_copy['Close']).fillna(0)
        df_copy['Bollinger_Upper'] = ta.volatility.bollinger_hband(df_copy['Close'])
        df_copy['Bollinger_Lower'] = ta.volatility.bollinger_lband(df_copy['Close'])
        df_copy['Volatility'] = df_copy['High'] - df_copy['Low']
        
        # SMC Features
        df_copy['Swing_High'] = df_copy['High'].rolling(window=3).apply(
            lambda x: x[1] if (x[1] > x[0] and x[1] > x[2]) else np.nan
        )
        df_copy['Swing_Low'] = df_copy['Low'].rolling(window=3).apply(
            lambda x: x[1] if (x[1] < x[0] and x[1] < x[2]) else np.nan
        )
        df_copy['Fvg'] = np.where(
            (df_copy['Low'].shift(2) > df_copy['High'].shift(1)) | 
            (df_copy['High'].shift(2) < df_copy['Low'].shift(1)), 
            1, 0
        )
        df_copy['Volume_Change'] = df_copy['Volume'].pct_change()
        
        # Fill NaN values
        return df_copy.fillna(method='ffill').fillna(0)
    
    def prepare_data(self):
        try:
            # Download and prepare historical data
            hist_data = yf.download(self.symbol)
            if hist_data.empty:
                raise ValueError(f"No data found for symbol: {self.symbol}")
            
            # Add technical indicators
            hist_data = self.add_technical_indicators(hist_data)
            
            # Store feature columns for later use
            self.feature_columns = hist_data.columns.tolist()
            
            # Scale the entire dataset
            scaled_data = self.scaler.fit_transform(hist_data)
            
            # Ensure scaled_data is 2D
            if scaled_data.ndim == 1:
                scaled_data = scaled_data.reshape(-1, 1)
            
            # Create sequences
            X, y = [], []
            for i in range(self.sequence_length, len(scaled_data)):
                X.append(scaled_data[i-self.sequence_length:i])
                y.append(np.ravel(scaled_data[i, hist_data.columns.get_loc('Close')]))
            
            return np.array(X), np.array(y), self.feature_columns
            
        except Exception as e:
            print(f"Error in data preparation: {e}")
            return None, None, None
    
    def create_model(self, num_features):
        model = Sequential([
            LSTM(128, return_sequences=True, 
                 input_shape=(self.sequence_length, num_features),
                 kernel_regularizer=L1L2(l1=1e-5, l2=1e-5)),
            Dropout(0.3),
            LSTM(128, return_sequences=True,
                 kernel_regularizer=L1L2(l1=1e-5, l2=1e-5)),
            Dropout(0.3),
            LSTM(64, return_sequences=False,
                 kernel_regularizer=L1L2(l1=1e-5, l2=1e-5)),
            Dense(64, kernel_regularizer=L1L2(l1=1e-5, l2=1e-5)),
            Dense(1)
        ])
        model.compile(optimizer='adam', loss=Huber(), metrics=['mse'])
        return model
    
    def train_model(self):
        try:
            # Prepare data
            X, y, feature_columns = self.prepare_data()
            if X is None:
                return None, None
            
            # Split data
            split_idx = int(len(X) * 0.8)
            X_train, X_val = X[:split_idx], X[split_idx:]
            y_train, y_val = y[:split_idx], y[split_idx:]
            
            # Create and train model
            model = self.create_model(X.shape[2])
            early_stopping = EarlyStopping(
                monitor='val_loss',
                patience=20,
                restore_best_weights=True
            )
            
            # Check GPU availability
            if tf.config.list_physical_devices('GPU'):
                print("Training on GPU")
            else:
                print("Training on CPU")
                
            model.fit(
                X_train, y_train,
                validation_data=(X_val, y_val),
                epochs=200,
                batch_size=64,
                callbacks=[early_stopping],
                verbose=1
            )
            
            return model, feature_columns
            
        except Exception as e:
            print(f"Error in model training: {e}")
            return None, None
    
    def calculate_confidence_score(self, df, current_price):
        score = 0
        signals = []
        
        # Liquidity levels
        recent_highs = df['Swing_High'].dropna()
        recent_lows = df['Swing_Low'].dropna()
        if not recent_highs.empty and current_price > recent_highs.iloc[-1]:
            score += 0.1
            signals.append("Broke recent high")
        if not recent_lows.empty and current_price < recent_lows.iloc[-1]:
            score += 0.1
            signals.append("Broke recent low")
            
        # Other signals
        if df['Fvg'].iloc[-1] == 1:
            score += 0.15
            signals.append("FVG present")
        if len(df) > 1 and df['Volume'].iloc[-1] > df['Volume'].iloc[-2] * 1.5:
            score += 0.05
            signals.append("High volume")
            
        return score, signals
    
    def predict_next_movement(self):
        try:
            # Train model
            model, feature_columns = self.train_model()
            if model is None:
                print("Model training failed. Exiting...")
                return
            
            print(f"Starting predictions for {self.symbol}")
            
            while True:
                try:
                    # Get and prepare live data
                    live_data = self.fetch_live_data()
                    if len(live_data) < self.sequence_length:
                        print("Insufficient live data")
                        time.sleep(60)
                        continue
                        
                    live_data = self.add_technical_indicators(live_data)
                    
                    # Scale the live data
                    scaled_data = self.scaler.transform(live_data)
                    X_pred = np.array([scaled_data[-self.sequence_length:]])
                    
                    # Make prediction
                    pred_scaled = model.predict(X_pred)
                    
                    # Convert prediction back to price
                    dummy = np.zeros((1, len(feature_columns)))
                    dummy[0, feature_columns.index('Close')] = pred_scaled[0][0]
                    predicted_price = self.scaler.inverse_transform(dummy)[0, feature_columns.index('Close')]
                    current_price = live_data['Close'].iloc[-1]
                    
                    # Calculate confidence and signals
                    confidence_score, signals = self.calculate_confidence_score(
                        live_data, current_price)
                    
                    # Determine action
                    threshold = 0.001 * current_price
                    if confidence_score > 0.3:
                        if predicted_price > current_price + threshold:
                            action = "BUY"
                            amount = int(100 * confidence_score)
                        elif predicted_price < current_price - threshold:
                            action = "SELL"
                            amount = int(100 * confidence_score)
                        else:
                            action = "HOLD"
                            amount = 0
                    else:
                        action = "HOLD"
                        amount = 0
                    
                    # Print results
                    print(f"\nTimestamp: {datetime.datetime.now()}")
                    print(f"Current Price: {current_price:.2f}")
                    print(f"Predicted Price: {predicted_price:.2f}")
                    print(f"Confidence Score: {confidence_score:.2f}")
                    print(f"Signals: {signals}")
                    print(f"Action: {action}, Amount: {amount}")
                    
                    time.sleep(60)
                    
                except Exception as e:
                    print(f"Prediction error: {e}")
                    time.sleep(60)
                    
        except Exception as e:
            print(f"Fatal error in prediction loop: {e}")

if __name__ == "__main__":
    predictor = StockPredictor("ONGC.NS")
    predictor.predict_next_movement()

# Error :-
# Error in data preparation: Data must be 1-dimensional, got ndarray of shape (7288, 1) instead
# Model training failed. Exiting...