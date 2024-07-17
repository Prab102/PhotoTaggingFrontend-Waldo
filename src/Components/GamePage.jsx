import { useRef, useState, useEffect} from 'react'
// import reactLogo from './assets/react.svg'
import {useParams, redirect, useNavigate} from 'react-router-dom'

import waldoImage from"../assets/waldo-removebg-preview.png";
import wilmaImage from "../assets/wilma-removebg-preview.png";
import wizardImage from "../assets/wizard-removebg-preview.png";
import odlawImage from "../assets/odlaw-removebg-preview.png";


import '../Style/GamePage.css'

function GamePage() {

  const [gameStart,setGameStart] = useState(false);

  const [selectionBox, setSelectionBox] = useState(false);
  const [boxPositionX, setBoxPositionX] = useState();
  const [boxPositionY, setBoxPositionY] = useState();
  const [characterSelected, setCharacterSelected] = useState("exit");
  const [characterCheck, setCharacterCheck] = useState(false);

  const [waldoFound, setWaldoFound] = useState(false);
  const [wizardFound, setWizardFound] = useState(false);
  const [wilmaFound, setWilmaFound] = useState(false);
  const [odlawFound, setOdlawFound] = useState(false);


  const [wrongClass, setWrongClass] = useState("correct");
  const[gameWon, setGameWin] = useState(false);
  const[timer, setTimer] = useState(0);
  
  const[startTimer, setStartTimer] = useState(false);
  //state variables for api calls
  const[levelInfo, setLevelInfo] = useState();
  const[characterInfo, setCharacterInfo]= useState([]);
  const [infoLoaded,setInfoLoaded] = useState(false);

  const navigate = useNavigate();
  const id = useParams(); 

  const startGame= () => {
    setGameStart(true);
    // start timer in backend 
    setStartTimer(true);  
  }

  let minutes = Math.floor(timer / 60);
  let seconds = timer - minutes * 60;
  if(seconds <10){
      seconds= "0"+ seconds;
  }
  useEffect(() => {
    if(startTimer == true){
      //convert timer into proper time
      setTimeout(() => setTimer(timer + 1), 1000);
      
    }
    
  }, [timer,startTimer]);
  
  async function getLevelData(){
    const response = await fetch(`https://heroic-surprise-production.up.railway.app/api/levels/${id.levelid}`);
    const product = await response.json();

    setLevelInfo(product);
   
    const response1 = await fetch(`https://heroic-surprise-production.up.railway.app/api/levels/${id.levelid}/characters`);
    const product1 = await response1.json();

    setCharacterInfo(product1);
    setInfoLoaded(true);

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

    const imageref = useRef()

    const checkSelection =() =>{

        // get max x of image and derive where waldo is 
      const rect = imageref.current.getBoundingClientRect();
       
        //get scale from original image
        let scale = 1;  
        if(levelInfo.pixelsX > rect.right){
           scale = levelInfo.pixelsX / rect.right;  
        }
        // const scale = levelInfo.pixelsX / rect.right;  
        console.log(characterInfo[0].xcoord, "xcoord for character");
        console.log(characterInfo[0].ycoord, "ycoord for character");

        // console.log(boxPositionX, "boxposition");
        console.log(rect.right- rect.left, "rect x length");
        // console.log((rect.left-boxPositionX) * -1, "left click selec")
        // console.log((rect.top-boxPositionY) * -1, "top click selec")
        const xposition = ((rect.left - (boxPositionX+rect.left)) * -1);
        const yposition = ((rect.top - (boxPositionY+rect.top)) * -1);
        const rectlength = rect.right-rect.left;
        const rectheight = rect.bottom-rect.top;
        console.log(xposition);
        console.log(yposition);

        console.log(characterInfo[1].xcoord / scale, "scale x");
        console.log(characterInfo[1].ycoord / scale, "scale y");




        if((((xposition > (characterInfo[0].xcoord / scale -(rectlength * .03) )) && (xposition< ( characterInfo[0].xcoord / scale + (rectlength * .03) ))) && ((yposition> (characterInfo[0].ycoord/ scale - (rectheight * .03))) && (yposition < (characterInfo[0].ycoord/scale + (rectheight * .03)))) && (characterSelected=="waldo")) ){
          // console.log("found waldo");
          setWaldoFound(true);
          setSelectionBox(false);
        }
        else if((((xposition> (characterInfo[1].xcoord / scale -(rectlength * .03) )) && (xposition< ( characterInfo[1].xcoord / scale + (rectlength * .03) ))) && ((yposition > (characterInfo[1].ycoord/ scale - (rectheight * .03))) && (yposition < (characterInfo[1].ycoord/scale + (rectheight * .03)))) && (characterSelected=="wizard")) ){
          // console.log("found wizard");
          setWizardFound(true);
          setSelectionBox(false);

        }
        else if((((xposition > (characterInfo[2].xcoord/ scale -(rectlength * .03) )) && (xposition< ( characterInfo[2].xcoord / scale + (rectlength * .03) ))) && ((yposition > (characterInfo[2].ycoord/ scale - (rectheight * .03))) && (yposition < (characterInfo[2].ycoord/scale + (rectheight * .03)))) && (characterSelected=="wilma")) ){
          // console.log("found wilma");
          setWilmaFound(true);
          setSelectionBox(false);

        }
        else if((((xposition > (characterInfo[3].xcoord / scale -(rectlength * .03) )) && (xposition< ( characterInfo[3].xcoord / scale + (rectlength * .03) ))) && ((yposition > (characterInfo[3].ycoord / scale - (rectheight * .03))) && (yposition < (characterInfo[3].ycoord /scale + (rectheight * .03)))) && (characterSelected=="odlaw")) ){
          // console.log("found odlaw");
          setOdlawFound(true);
          setSelectionBox(false);

        }

        else{
          setWrongClass(characterSelected+"wrong");
        }
        // console.log("found waldo");
        setCharacterCheck(false);
    }


    const setSelection =(e) =>{
      // console.log("selection was", e.target.id)
      setCharacterSelected(e.target.id);
      // console.log(characterSelected);
      if(e.target.id == "exit"){
        setSelectionBox(false);
      }
      else
        setCharacterCheck(true);
        setWrongClass("empty");

    }


    if(characterCheck == true){
      checkSelection();
    }
    
    //game win condition
    if(waldoFound == true && wizardFound==true && odlawFound==true && wilmaFound==true && gameWon ==false){
      // console.log("You Win");
      setStartTimer(false);
      // console.log(timer);
      setGameWin(true);
      setSelectionBox(false);
    }

    const displayBox =(e) =>{

      const rect = imageref.current.getBoundingClientRect();
      

      if(gameWon == false){
        console.log(e.clientX -rect.top, "x click")
        console.log(e.clientY -rect.left, "Y click")
        // //gets image pixel
        console.log((rect.left-e.clientX) * -1, "left click")
        console.log((rect.top-e.clientY) * -1, "top click")


        setBoxPositionX(((e.clientX)-rect.left));
        setBoxPositionY(((e.clientY)-rect.top ));
        // setBoxPositionX(((e.clientX + rect.left) ));
        // setBoxPositionY(((e.clientY + rect.top) ));
        
        setSelectionBox(true);
        setWrongClass("empty");
      }
    }
    // console.log(boxPositionX)
    // console.log(boxPositionY)


    // const actionstring = `https://heroic-surprise-production.up.railway.app/api/levels/${id.levelid}/leaderboards`
    async function  submitScore (event) {
      event.preventDefault();
      const data1 = new FormData(event.target);
      const data = {
        playername: data1.get("playername"),
        time:data1.get("time"),
        levelid: id.levelid
      }
     
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
      // console.log(data);
      const response = await fetch(`https://heroic-surprise-production.up.railway.app/api/levels/${id.levelid}/leaderboards`, requestOptions);
      const data2 = await response.json();

      // console.log("makes it here");
      navigate("/");

  
    }

  return (
    <>
      <div id="gamepage">
        {gameStart && infoLoaded  ? <><div id="gameboard" >

              <img src={`https://heroic-surprise-production.up.railway.app/${levelInfo.imgpath}`} alt="Waldo 1"  ref ={imageref} onClick= {(e)=>{displayBox(e)}} useMap='#characterpositions'/>
              {selectionBox  ? <div id="selectionbox"  style ={{left: `${boxPositionX}px`,top: `${boxPositionY}px`}}>
                  
                    <li className={wrongClass} id="waldo" onClick={(e)=>{setSelection(e)}}> Waldo </li>
                    <li className={wrongClass} id="wizard" onClick={(e)=>{setSelection(e)}}> Wizard </li>
                    <li className={wrongClass} id="wilma" onClick={(e)=>{setSelection(e)}}>Wilma</li>
                    <li className={wrongClass}id="odlaw" onClick={(e)=>{setSelection(e)}}>Odlaw</li>
                    <li id="exit" onClick={(e)=>{setSelection(e)}}>Exit</li>
                  
              </div> 
              : <> 
              
              </>}
              {gameWon ? <div>

                    <div id="victorycard">
                      <p id="winmessage" >  You Win!!!</p>

                      <p id="time">Your Time: {minutes}:{seconds}s</p>
                      <p id="time">Enter Your Name to the Leaderboards </p>
                      <form onSubmit={event => submitScore(event)}>

                        <input id="formname" type="text" name="playername" placeholder="Playername" required={true} />
                        <input  type="hidden" name="time" value={timer} required={true} />
                        <button type="submit" id="formsubmit">Submit</button>

                      </form>
                      
                    </div>
                  
                </div>
              :
                <>
                </> 
              }

              <div id="bottombar" >
                {waldoFound ? <img className="found" id="waldofound" src={waldoImage} alt="Waldo found" /> : <img className="notfound" id="waldonotfound" src={waldoImage} alt="Waldonotfound" />}
                {wizardFound ? <img className="found"  id="wizardfound" src={wizardImage} alt="Wizard found" /> : <img className="notfound" id="wizardnotfound" src={wizardImage} alt="Wizardnotfound" />}
                {wilmaFound ? <img className="found" id="wilmafound" src={wilmaImage} alt="Wilma found" /> : <img className="notfound" id="wilmanotfound" src={wilmaImage} alt="Wilmanotfound" />}
                {odlawFound ? <img className="found" id="odlawfound" src={odlawImage} alt="Odlaw found" /> : <img className="notfound" id="odlawnotfound" src={odlawImage} alt="Odlawnotfound" />}
                <div id="clock">
                  {minutes}
                    :
                  {seconds}
                </div>
              </div>
              
        </div></> : <> 
              { infoLoaded ?
              <div id="startpage">
                <div id="startlevelname">{levelInfo.name}</div>
                <div id="startcontent">
                  <p>Press Start to Begin</p>
                 <div id="startbutton"onClick={startGame}>Start</div>
                </div>
              </div>
              : <>
                <div id="loadercontainer">
                    <div id="loader">
                    </div>
                </div>
                </>
          }
        </>}
        
      </div>
    </>
  )
}

export default GamePage