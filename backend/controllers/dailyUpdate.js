const Daily = require("../models/Daily");
const Stock=require('../models/Stock');
const User=require('../models/User')
function timeConverter(UNIX_timestamp){
const myDate = new Date(UNIX_timestamp * 1000); // convert timestamp to milliseconds and construct Date object
const date = new Date(UNIX_timestamp);
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const day = String(date.getDate()).padStart(2, '0');
const hours = String(date.getHours()).padStart(2, '0');
const minutes = String(date.getMinutes()).padStart(2, '0');
const seconds = String(date.getSeconds()).padStart(2, '0');
return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

exports.updateDaily=async(req,res)=>{
    try{
      console.log('prices',prices);
      const allStocks=await Stock.find({});
      const today=Date.now();
    //  console.log('inupdate',allStocks);
     allStocks.forEach(async(element) => {
         const curr=await Stock.findOneAndUpdate({name:element.name},{
            $push:{
               'update':{time:timeConverter(today).split(" ")[0],value:element.currentPrice}
            },
        
         })
       // console.log('the singular of all stocks is : ',element)
     });

    return res.status(200).json({
        success:true,
        message:"Date insertion Successfull",
    
    })
    }
    catch(error){
        return res.status(500).json(
            {
                success:false,
                message:"Error in dailyUpdate",
                error:error.message
            }
        )

    }
}
//This one is for updating the prices of stocks daily
exports.updatePrices=async(req,res)=>{
    try{
       
        const prices =req.body.prices;
        console.log('The data format in update prices is :',prices);
        prices.forEach(async(element)=>{
           const curr=await Stock.findOneAndUpdate({name:element.symbol},{currentPrice:element.price})
        })
        return res.status(200).json({
            success:true,
            message:'the updating of data prices was successfull',
            data:prices,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Error while updating the daily prices',
            error:error.message
        })
    }

}
exports.getDailyData=async(req,res)=>{
    try{
        const stockName=req.body.name;
        const stock=await Stock.findOne({name:stockName});
        if(!stock){
            return res.status(400).json({
                success:false,
                message:'stock not found',

            })
        }
        return res.status(200).json({
            success:true,
            message:'Dateline series data',
            data:stock.update
        })
    }
    catch(error){
      return res.status(500).json({
        success:false,
        message:'Stock daily data could not be fetched',
        error:error.message
      })
    }
}
