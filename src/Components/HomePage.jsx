import { useState } from 'react'
import '../Style/HomePage.css'
import { Link } from 'react-router-dom'
function HomePage({levels}) {
  // const [levels, setLevels] = useState(0)


  return (
    <>
      <div id="homepage">
        <div id="homeheader">
          <p id="welcome">Welcome to "Where's Waldo" </p>
          <p id="welcome2"> A Photo Tagging Game</p>
          <p id="description">Find Waldo and his friends the Wizard, Odlaw, and Wilma in a race against the clock, and log your fastest times to the leaderboards.
          Each level has an increaseing difficulty to challenge your observational skills.
          </p>
          
          

        </div>
        <div id="levelcontainer"> 
        {levels.map((levels,index) => (
                  
                    <div className="card" id="card1" key={index}>
                        <Link to={"/game/"+levels._id}> 
                          
                          <div id="linkstuff">

                            <img  width="300"src={`https://heroic-surprise-production.up.railway.app/${levels.imgpath}`} alt="level1" />
                        
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

export default HomePage