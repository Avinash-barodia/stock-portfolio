import axios from "axios";

const fetchData=async()=>{
const{data}=await axios.get('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=3m&limit=150');
return data;
}

const bitcoin1=await fetchData();

let bitcoin2=[];
bitcoin1.forEach(coin => {
    bitcoin2.push({
        time:coin[0]/1000,
        open:parseFloat(coin[1]),
        high:parseFloat(coin[2]),
        low: parseFloat(coin[3]),
        close:parseFloat(coin[4]),

    })
});
export const bitcoin=bitcoin2;