import { useState, useEffect} from 'react'

import { Link } from 'react-router-dom'
import {Routes, Route} from 'react-router-dom'
import HomePage from './Components/HomePage'
import GamePage from './Components/GamePage'
import AboutPage from './Components/AboutPage'
import Navbar from './Components/Navbar'
import './App.css'
import LeaderBoardPage from './Components/LeaderBoardPage'
import LeaderBoardSelectionPage from './Components/LeaderBoardSelectionPage'

function App() {
  // const [count, setCount] = useState(0);
  const [levels, setLevels] = useState([]);
  const [dataState,setDataState] = useState(false);

  // heroic-surprise-production.up.railway.app

  async function getData(){
    const response = await fetch('https://heroic-surprise-production.up.railway.app/api/levels');
    const product = await response.json();
  
    setLevels(product);
    setDataState(true);    
  }
  useEffect(()=>{
    const controller = new AbortController();
    // const signal = controller.signal;
  
    const key = getData();
  
    return() =>{
        clearInterval(key)
        controller.abort();
    };
  
  },[]);

  return (
    <>
      <Navbar/>
     
      {dataState ? ( 
          <Routes > 
            <Route path="/" element={<HomePage levels={levels}/>}/>
            <Route path="/game/:levelid" element={<GamePage />}/>
            <Route path="/leaderboard" element={<LeaderBoardSelectionPage levels={levels}/>}/>

            <Route path="/leaderboard/:levelid" element={<LeaderBoardPage />}/>
            <Route path="/about" element={<AboutPage />}/>

            
          </Routes>
          ):(
            <div id="loadercontainer">
              <div id="loader">
              </div>
            </div>
              )}
      
    </>
  )
}

export default App
