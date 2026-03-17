const axios = require('axios');

exports.getStockHistory = async (req, res) => {
    try {
        const { symbol } = req.params;
        const { interval = '15m', range = '7d' } = req.query;

        // Yahoo intervals: 1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo
        // Yahoo ranges: 1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max
        
        const intervalMap = {
            '1m': '1m',
            '15m': '15m',
            '1h': '1h',
            '1d': '1d',
            '1w': '1wk',
            '1mo': '1mo'
        };

        const rangeMap = {
            '1d': '1d',
            '1w': '5d',
            '1m': '1mo',
            '3m': '3mo',
            '1y': '1y',
            'max': 'max'
        };

        const yahooInterval = intervalMap[interval] || interval;
        const yahooRange = rangeMap[range] || range;

        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.NS?interval=${yahooInterval}&range=${yahooRange}`;
        
        const response = await axios.get(url);
        
        const result = response.data.chart.result[0];
        const timestamps = result.timestamp;
        const quote = result.indicators.quote[0];
        
        const formattedData = timestamps.map((ts, index) => ({
            time: ts, // Already in seconds
            open: quote.open[index],
            high: quote.high[index],
            low: quote.low[index],
            close: quote.close[index]
        })).filter(item => 
            item.open !== null && 
            item.high !== null && 
            item.low !== null && 
            item.close !== null
        ); // Filter out null values

        return res.status(200).json({
            success: true,
            data: formattedData
        });

    } catch (error) {
        console.error('Error fetching stock history:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Error fetching stock history',
            error: error.message
        });
    }
};
