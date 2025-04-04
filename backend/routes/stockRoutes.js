const express=require('express');
const router=express.Router();

const{buyStock,getAllStocks,getData,getUserStocks}=require("../controllers/buyStock");
const {auth}=require('../middlewares/auth');
const {cryptoStream}=require('../controllers/cryptoStream')
const {updateDaily,getDailyData,updatePrices}=require('../controllers/dailyUpdate');
router.post("/buy",auth,buyStock);
router.get('/daily',getData);
router.get("/getStocks",auth,getUserStocks);
router.post("/getStocks2",getAllStocks);
router.post('/update',updateDaily);
router.post('/daily',getDailyData);
router.post('/priceUpdate',updatePrices);
module.exports=router;