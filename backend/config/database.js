const mongoose =require('mongoose');

const dbConnect=async()=>{
    mongoose.connect("mongodb://localhost:27017/stocksDB",{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log("Database Connected Successfully"))
    .catch((error)=>console.log("An error occured while connecting to the database"));
}
module.exports=dbConnect;