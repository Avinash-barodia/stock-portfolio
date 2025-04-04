import React, { useEffect ,useState} from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import { useSelector } from 'react-redux';



export default function ElementHighlights() {
  const [highlighted, setHighlighted] = React.useState('item');
  const [faded, setFaded] = React.useState('global');
  const[assets,setAssets]=useState([]);
  const [data,setData]=useState([]);
  const user =useSelector((state)=>state.user)
  const token=user.token;


  const pieChartsParams = {
    series: [
      {
        data: data,
        label: 'Series 1',
        outerRadius: 110,
        highlighted: { additionalRadius: 10 },
      },
    ],
    height:400 ,
    margin: { top: 50, bottom: 50 },
  };

  const fetchData=async()=>{
    try{
        console.log('token',token);
        const res = await axios.get('http://localhost:4900/api/v1/getStocks', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        let temp=[];
        res.data.data.forEach(el=>temp.push(el.data));
       // console.log('temp',temp);
        setAssets(temp);
    }
    catch(error){
        console.log('Error fteching stocks from user',error.message);
    }
}


  useEffect( ()=>{
    fetchData();
  },[])
  useEffect(()=>{
    const set=()=>{
        let temp=[];
        assets.forEach((element)=>{
        temp.push({value:element.quantity});
        })
        setData(temp);
    }
    set();
  },[assets])


  return (
    <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
        <PieChart
          {...pieChartsParams}
          series={pieChartsParams.series.map((series) => ({
            ...series,
            highlightScope: {
              highlighted,
              faded,
            },
          }))}
        />
      </Box>
      <Stack direction="row" spacing={3} justifyContent="center">
        <TextField
          select
          label="highlighted"
          value={highlighted}
          onChange={(event) => setHighlighted(event.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="none">none</MenuItem>
          <MenuItem value="item">item</MenuItem>
          <MenuItem value="series">series</MenuItem>
        </TextField>
        <TextField
          select
          label="faded"
          value={faded}
          onChange={(event) => setFaded(event.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="none">none</MenuItem>
          <MenuItem value="series">series</MenuItem>
          <MenuItem value="global">global</MenuItem>
        </TextField>
      </Stack>
    </Stack>
  );
}
