import { useState } from 'react'
import waldohat from '../assets/file.png'

import '../Style/Navbar.css'
import { Link } from 'react-router-dom'
function Navbar() {
//   const [count, setCount] = useState(0)

  return (
    <>
      <div id="navbarcontainer">
        <div id="logo">
          <div >
            <img width="40px"src={waldohat}alt="" />
          </div>
          <p>Where's Waldo</p>
        </div>
        <div id="navbar">
          
            <Link className='navitem' to="/"> Home</Link>
            
            <Link className="navitem " to="/leaderboard"> Leaderboards</Link>

            <Link className='navitem' to="/about"> About</Link>
        
        </div>

      </div>

    </>
  )
}

export default Navbar