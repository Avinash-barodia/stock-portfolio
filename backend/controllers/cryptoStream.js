const {WebSocket}=require('ws')

exports.cryptoStream=async(req,res)=>{
 try{  
    const axios = require('axios');
const url = 'https://api.upstox.com/v2/login/authorization/token';
const headers = {
  'accept': 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded',
};
const data = {
  'code': '{915600}',
  'client_id': '{48AXXE}',
  'client_secret': '{your_client_secret}',
  'redirect_uri': '{your_redirect_url}',
  'grant_type': 'authorization_code',
};
let result;
axios.post(url, new URLSearchParams(data), { headers })
  .then(response => {
    console.log("resdata ",response.status);
   // console.log(response.data);
    result=response;
  })
  .catch(error => {
     console.error(error.message);
    // console.error(error);
  });
   
  return res.status(200).json({
    success:true,
    result:result,
  })
}
catch(error){
    return res.status(500).json({
        success:false,
        error:error.message,
    })
}
}