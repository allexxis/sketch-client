import {  useState,useEffect,useRef } from 'react';
import Canvas from '../components/Canvas'
import Timer from '../components/Timer'
import {broadcastEvent} from '../services/index'
import {useParams}from 'react-router-dom'
import { io } from 'socket.io-client';


const Game = ()=>{
   const socket = useRef();
   const {id} = useParams()
   const [timer,setTimer] = useState(0)
   const [pixelBuffer,setPixelBuffer] = useState([])
   useEffect(()=>{
      socket.current = io("https://7baf5e61b0f7.ngrok.io", {
         reconnectionDelayMax: 10000,
         query:{
            room:id
         }
      })
      return ()=>{
         socket.current.disconnect()
      }
   },[id])
   const onDraw = (coordinates)=>{
      if(pixelBuffer.length===25){
         broadcastEvent({event:'DRAW',payload:pixelBuffer})
         setPixelBuffer([coordinates]);
         socket.current.emit('DRAW',pixelBuffer)
      }else{
         setPixelBuffer([...pixelBuffer,coordinates]);
      }
   }
   const onClear =()=>{
      // setTimer(1000)
      // startClock()
      broadcastEvent({event:'CLEAR',payload:null})
      socket.current.emit('CLEAR')
   }
   const startClock =()=>{
      const clock = setInterval(() => {
         setTimer(prevTimer=>prevTimer-50)
         setTimeout(()=>{
            clearInterval(clock)
            setTimer(null)
         },20000)
      }, 1000);
   }
   return <div>
      <Canvas socket={socket.current} onDraw={onDraw} onClear={onClear} title={id} />
      {timer>0&&<Timer timer={timer}/>}  
      
   </div>
}
export default Game