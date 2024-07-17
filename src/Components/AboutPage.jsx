import { useState } from 'react'

import '../Style/AboutPage.css'
import { Link } from 'react-router-dom'
import github from'../assets/github.svg'
function AboutPage({levels}) {


  return (
    <>
      <div id="aboutpage">
        
        <div id="creator">
           <p>This web application was developed by </p> 
           <p>Prabjot Singh</p>

           <a href="https://github.com/Prab102" target="_blank" rel="noopener noreferrer"> <img src={github} width="30"alt="" /> </a>
        </div>
        <div id="fairuse">
            This app is not intended for commercial use. This web project was created for educational purposes to showcase skills to develop a photo tagging app. 
            All rights for the images used belong to their respective owners.
        </div>

      </div>
      
    </>
  )
}

export default AboutPage