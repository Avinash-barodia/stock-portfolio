import './App.css';
import { Navbar } from './components/Navbar';
import {Routes,Route, BrowserRouter} from 'react-router-dom'
import { Home } from './pages/Home';
import { MarketUpdate } from './components/MarketUpdate';
import { Login } from './pages/Login';
import { Technical } from './pages/Technical';
import { Test } from './pages/Test';
import { Portfolio } from './pages/Portfolio';
import RangeSwitcherChart from "./components/Lineseries"
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NewsCard } from './components/NewsCard';
import { Updates } from './pages/Updates';
import { Ticker } from './components/Ticker';
import { Slider } from './components/Slider';

function App() {
     




  return (
    <div className="App">
        <Navbar/>
        <Slider/>
       <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/technical/:name' element={<Technical/>} />
        <Route path='/portfolio' element={<Portfolio/>}/>
        <Route path='/test' element={<Slider/>}/>
        <Route path='/updates'  element={<Updates/>}/>
        <Route path='/portfolio/test' element={<RangeSwitcherChart data={'LockheedMartin'} />}/>
       </Routes>
      
    </div>
  );
}

export default App;
