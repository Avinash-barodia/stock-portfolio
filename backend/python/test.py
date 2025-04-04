import requests 
import pandas as pd 
import numpy as np 
import time
from flask import jsonify
import pandas as pd

# Create an empty DataFrame to store the data
df = pd.DataFrame(columns=['timestamp', 'open', 'high', 'low', 'close', 'volume'])

startTime = 946684800000  # January 1, 2000
endTime = startTime + (500 * 60 * 60 * 1000)  # 500 hours from start

while startTime < 1689456000000:  # Current time
    url = f"https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h&startTime={startTime}&endTime={endTime}"
    response = requests.get(url)
    data = response.json()
    
    # Create a temporary DataFrame from the API response
    temp_df = pd.DataFrame(data, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume', 'close_time', 'quote_asset_volume', 'number_of_trades', 'taker_buy_base_asset_volume', 'taker_buy_quote_asset_volume', 'ignore'])
    
    # Convert the timestamp column to datetime
    temp_df['timestamp'] = pd.to_datetime(temp_df['timestamp'], unit='ms')
    
    # Append the temporary DataFrame to the main DataFrame
    df = df._append(temp_df[['timestamp', 'open', 'high', 'low', 'close', 'volume']], ignore_index=True)
    
    # Update the start and end times for the next request
    startTime = endTime
    endTime = startTime + (500 * 60 * 60 * 1000)

# Reset the index and drop the old index column
df = df.reset_index(drop=True)
print(df.head())
