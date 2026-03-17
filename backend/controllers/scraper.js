const axios = require('axios');
const cheerio = require('cheerio');

exports.fetchStockData = async (req, res) => {
    try {
        const { ticker } = req.params;
        const url = `https://www.google.com/finance/quote/${ticker}:NSE`;
        
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        
        const $ = cheerio.load(response.data);
        
        // Google Finance CSS classes (as of current knowledge)
        const priceClass = '.YMlKec.fxKbKc';
        const volumeClass = '.P6K39c'; 
        
        const price = $(priceClass).text().replace(/[₹,]/g, '');
        
        // Volume is often the 5th element with this class in the details section
        let volume = null;
        const details = $(volumeClass);
        if (details.length >= 5) {
            volume = $(details[4]).text().replace(/[MK,]/g, '');
        }
        
        if (!price) {
            return res.status(404).json({ success: false, message: `Could not fetch data for ${ticker}` });
        }

        return res.status(200).json({
            success: true,
            price: price,
            volume: volume || '0'
        });

    } catch (error) {
        console.error(`Error scraping ${req.params.ticker}:`, error.message);
        return res.status(500).json({
            success: false,
            message: 'Error fetching live data',
            error: error.message
        });
    }
};
