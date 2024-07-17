import { useState } from 'react'

import '../Style/LeaderBoardSelectionPage.css'
import { Link } from 'react-router-dom'
function LeaderBoardSelectionPage({levels}) {
//   const [count, setCount] = useState(0)


  return (
    <>
    <div id="leaderboardpage">
    <   div id="leaderboardheader">
          <p id="welcome">Select a Levels Leaderboard </p>

          
        </div>
      <div id="levelcontainer"> 
      {levels.map((levels,index) => (
                  <div className="card" id="card1" key={index}>

                  <Link to={"/leaderboard/"+levels._id}> 

                    <div id="linkstuff">

                            <img  width="300"src={`https://heroic-surprise-production.up.railway.app/${levels.imgpath}`} alt="level" />
                        
                            <p id="levelname">{levels.name}</p>

                          </div>
                  
                  </Link>
                  </div>

              ))}
      
      </div>

    </div>
     
    </>
  )
}

export default LeaderBoardSelectionPage