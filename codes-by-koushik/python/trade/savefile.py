import yfinance as yf
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from datetime import datetime

class StockPredictor:
    def __init__(self, symbol="ONGC.NS", sequence_length=150):
        self.symbol = symbol
        self.sequence_length = sequence_length
        self.scaler = MinMaxScaler(feature_range=(0, 1))
        self.target_scaler = MinMaxScaler(feature_range=(0, 1)) # Separate scaler for the target variable

    def fetch_live_data(self, interval="1m"):
        try:
            stock = yf.Ticker(self.symbol)
            # data = stock.history(period="max", interval=interval)
            data = stock.history(start="1996-01-01", end=None, interval="1d")
            self._save_data_to_csv(data)  # Call the method to save data
            return data
        except Exception as e:
            print(f"Error fetching live data: {e}")
            return pd.DataFrame()

    def _save_data_to_csv(self, data):
        """Saves the fetched data to a CSV file."""
        if data.empty:
            print("No data to save.")
            return
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{self.symbol.replace('.NS', '').lower()}_live_data_{timestamp}.csv"
        try:
            data.to_csv(filename)
            print(f"Data saved to {filename}")
        except Exception as e:
            print(f"Error saving data to CSV: {e}")

if __name__ == '__main__':
    predictor = StockPredictor()
    live_data = predictor.fetch_live_data()
    if not live_data.empty:
        print(live_data.head())