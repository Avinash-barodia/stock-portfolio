const Stock = require('../models/Stock');
const User = require('../models/User');
const axios = require('axios');
exports.buyStock = async (req, res) => {
    try {
        const { name, buyingPrice, currentPrice, quantity ,update} = req.body;
        let user = req.user;
        const data = {
            name,
            buyingPrice,
            currentPrice,
            quantity,
            update
        }
        const response = await Stock.create({ name, buyingPrice, currentPrice, quantity });
        //console.log("user inby",user)
        const res1 = await User.findByIdAndUpdate(user._id, {
            $push: { "portfolio": { data } }
        })
        return res.status(200).json({
            success: true,
            data: response,
            user: res1,
            message: "Entry of the stock has been created successfully"
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while creating the entry of stock in the database",
        })

    }

}
exports.getAllStocks = async (req, res) => {
    try {
        const response = await Stock.find({});
        if (!response) {
            return res.status(400).json({
                success: false,
                message: "Could not fetch Stocks from the database",
            })
        }
        return res.status(200).json({
            success: true,
            message: "The data for stocks has been fetched successfully",
            data: response,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while fetching the stock from the database",
            error: error.message,
        })
    }
}
exports.getUserStocks=async(req,res)=>{
    try{
        const user=req.user;
        console.log('user',user);

        return res.status(200).json({
            success:true,
            messsage:"success",
            data:user.portfolio,
        })

    }
    catch(error){
          return res.status(500).json({
            success:false,
            message:error.message,
          })
    }
}








exports.getData = async (req, res) => {


    const url = 'https://api.upstox.com/v2/historical-candle/NSE_EQ%7CINE848E01016/day/2023-11-19/2023-11-12';
    const headers = {
        'Accept': 'application/json'
    };

    axios.get(url, { headers })
        .then(response => {
            // Do something with the response data (e.g., print it)
            console.log(response.data);
            return res.status(200).json({
                success:true,
                data:response.data,
            })
        })
        .catch(error => {
            // Print an error message if the request was not successful
            console.error(`Error: ${error.response.status} - ${error.response.data}`);
        });

}