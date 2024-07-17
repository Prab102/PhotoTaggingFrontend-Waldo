import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'

import '../Style/LeaderBoardPage.css'

import { Link } from 'react-router-dom'
function LeaderBoardPage() {
//   const [count, setCount] = useState(0)
const [leaderBoardInfo, setLeaderBoardInfo] = useState([]);


//backend calls for images pass imageid with selected Level
const id = useParams(); 

async function getLevelData(){
  const response = await fetch(`https://heroic-surprise-production.up.railway.app/api/levels/${id.levelid}/leaderboards`);
  const product = await response.json();

  setLeaderBoardInfo(product);

}

useEffect(()=>{
  const controller = new AbortController();
  // const signal = controller.signal;

  const key = getLevelData();

  return() =>{
      clearInterval(key)
      controller.abort();
  };

},[]);


  return (
    <>
      <div id="leaderboardpage">
       
        <div id="allcompetitors"> 
          <h1>Leaderboards</h1>
          <div id="titleheader">
            <div>Rank</div>
            <div>Player</div>
            <div>Score</div>
          </div>
          <br />
          {leaderBoardInfo.map((leaderBoardInfo,index) => (
          
                    <div className="card" id="leaderboardcard" key={index}>

                      <div id="playerrank">
                        #{index+1} 
                      </div>
                      <div id="playername">
                        {leaderBoardInfo.username}
                      </div>
                      <div id="playerscore">
                       {(leaderBoardInfo.score - (Math.floor( leaderBoardInfo.score/ 60)) * 60) <10 ? <> 

                          {Math.floor( leaderBoardInfo.score/ 60)}:0{leaderBoardInfo.score - (Math.floor( leaderBoardInfo.score/ 60)) * 60}
                       </> :
                       <>
                          {Math.floor( leaderBoardInfo.score/ 60)}:{leaderBoardInfo.score - (Math.floor( leaderBoardInfo.score/ 60)) * 60}
                       </>}
                      </div>

                    </div>

                ))}
        </div>

      </div>

    </>
  )
}

export default LeaderBoardPage