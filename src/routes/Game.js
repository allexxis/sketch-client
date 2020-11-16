import {  useState,useEffect } from 'react';
import Canvas from '../components/Canvas'
import Timer from '../components/Timer'
import {broadcastEvent} from '../services/index'

const Game = ()=>{
   const [timer,setTimer] = useState(0)
   const [pixelBuffer,setPixelBuffer] = useState([])
  
   useEffect(()=>{
      console.log('on mount')
   },[])
   const onDraw = (coordinates)=>{
      if(pixelBuffer.length===25){
         broadcastEvent({event:'DRAW',payload:pixelBuffer})
         setPixelBuffer([coordinates]);
      }else{
         setPixelBuffer([...pixelBuffer,coordinates]);
      }
   }
   const onClear =()=>{
      setTimer(1000)
      startClock()
      broadcastEvent({event:'CLEAR',payload:null})
   }
   const startClock =()=>{
      const clock = setInterval(() => {
         setTimer(prevTimer=>prevTimer-100)
         setTimeout(()=>{
            clearInterval(clock)
            setTimer(null)
         },10000)
      }, 1000);
   }
   return <div>
      
      <Canvas onDraw={onDraw} onClear={onClear} />
      {timer>0&&<Timer timer={timer}/>}  
      
   </div>
}
export default Game