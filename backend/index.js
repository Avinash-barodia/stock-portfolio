const express =require('express');
const app=express();
const cors=require('cors');
const { Server } = require("socket.io");

app.use(cors());

app.use(express.json());


const dbConnect=require("./config/database");
dbConnect();
const stockRoutes=require('./routes/stockRoutes');
const userRoutes=require('./routes/userRoutes')
app.use('/api/v1/',stockRoutes,userRoutes);
const PORT=4900 || 5600 || 4500;






app.listen(PORT,()=>{
    console.log(`App has successfully started at  ${PORT}`);
})

