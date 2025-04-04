import os
import logging
from bs4 import BeautifulSoup
from flask import Flask, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins
    
# Configure logging to output to console
logging.basicConfig(level=logging.DEBUG)

@app.route('/fetch/<ticker>', methods=['GET'])
def fetchData(ticker):
    try:
        url = f'https://www.google.com/finance/quote/{ticker}:NSE'
        response = requests.get(url)
        
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Find elements for price and volume
            price_class = 'YMlKec fxKbKc'
            volume_class = 'P6K39c'  # Replace with your actual class name for volume
            
            # Fetch price
            price =soup.find(class_=price_class).text.replace("₹", "").replace(",", "")
            
            # Fetch volume
            volume = None
            if volume_class:
                volume = soup.find_all(class_=volume_class)[4].text.replace('M', '').replace('K',"")
            
            logging.debug(f"Fetched price for {ticker}: {price}")
            logging.debug(f"Fetched volume for {ticker}: {volume}")
            
            return jsonify({'price': price, 'volume': volume})
        else:
            logging.error(f"Failed to fetch data for {ticker}. Status code: {response.status_code}")
            return jsonify({'error': 'Failed to fetch data'}), response.status_code
    except Exception as e:
        logging.exception(f"Error fetching data for {ticker}: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))  # Default to 8080 if PORT is not set
    app.run(debug=True, port=port)
