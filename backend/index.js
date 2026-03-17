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
const path = require('path');
const PORT= process.env.PORT || 4900;

// Production setup
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../stock-frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../stock-frontend', 'build', 'index.html'));
    });
}

app.listen(PORT,()=>{
    console.log(`App has successfully started at  ${PORT}`);
})

