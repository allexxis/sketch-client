import '../App.css';
import { useEffect, useState } from 'react';

const colors = [
   'black',
   'white',
   'yellow',
   'green',
   'red',
   'blue',
   'orange',
   'brown',
];
const Canvas = ({onDraw,onClear,onPencilChange,title,socket}) => {
   
   const [pencilColor, setPencilColor] = useState('black');
   const [location, setLocation] = useState({ x: 0, y: 0 });
   const [clickLocation, setClickLocation] = useState({ x: 0, y: 0 });
   const [moving, setMoving] = useState(false);
   const [canvas, setCanvas] = useState(null);
   const [ctx, setCtx] = useState(null);
   const [pencilSize, setPencilSize] = useState(1);
   
   const init = (e) => {};
   const clear = () => {
        onClear()
        ctx.clearRect(0, 0, canvas.width, canvas.height);

   };
   const pencilMove = (e) => {
      e.preventDefault();
      setClickLocation(location);
      if (canvas) {
         setLocation({
            x: e.clientX - canvas.getBoundingClientRect().left,
            y: e.clientY - canvas.getBoundingClientRect().top,
         });
      }
      if (moving) {
         draw();
      }
   };

   const drawFromSocket=(coordinates)=>{
      for (let i = 0; i < coordinates.length; i++) {
         ctx.beginPath();
         ctx.moveTo(coordinates[i].from.x, coordinates[i].from.y);
         ctx.lineTo(coordinates[i].to.x, coordinates[i].to.y);
         ctx.strokeStyle = coordinates[i].c;
         ctx.lineWidth = coordinates[i].s;
         ctx.stroke();
         
      }
   }
   const draw = () => {
      ctx.beginPath();
      ctx.moveTo(clickLocation.x, clickLocation.y);
      ctx.lineTo(location.x, location.y);
      ctx.strokeStyle = pencilColor;
      ctx.lineWidth = pencilSize;
      ctx.stroke();
      onDraw({
         from:{
            x:clickLocation.x,
            y:clickLocation.y,
            

         },
        to:{
            x:location.x,
            y:location.y,
         },
        c:pencilColor,
        s:pencilSize
      })
   };
   const pencilClick = (e) => {
      draw();
      setMoving(true);
   };
   const pencilRelease = (e) => {
      e.preventDefault();
      setMoving(false);
   };
   useEffect(()=>{
      if(socket){
         socket.on('CLEAR',()=>{
            const board = document.getElementById('board');
            const localCtx =board.getContext('2d');
            localCtx.clearRect(0, 0, board.width, board.height);
         })
         socket.on('DRAW',(coordinates)=>{
            drawFromSocket(coordinates)
         })
      }
   },[socket])
   useEffect(() => {
      
      // Se crean los elementos del canvas y context del canvas al onComponentMount
      setCanvas(document.getElementById('board'));
      setCtx(document.getElementById('board').getContext('2d'))


      
   }, []);
   return (
      <div className="App">
         <div className="board-container">
            <h1>{title}</h1>
            <button onClick={clear}>Limpiar</button>
            <div className="slidecontainer">
               <h3>Grosor del pincel</h3>
               <input
                  onChange={(e) => {
                     setPencilSize(e.target.value);
                  }}
                  type="range"
                  min="1"
                  max="100"
                  value={pencilSize}
                  className="slider"
                  id="myRange"
               />
            </div>
            <div style={{ margin: 'auto', display: 'inline-block' }}>
               {colors.map((color,index) => {
                  if (color === 'white') {
                     let style = {
                        border: 'solid 1px',
                        backgroundColor: color,
                        margin: 10,
                        height: 20,
                        width: 40,
                     };
                     if (pencilColor === color) {
                        style.height = 30;
                        style.width = 50;
                     }
                     return (
                        <div
                           key={index}
                           onClick={() => {
                              setPencilColor(color);
                           }}
                           style={style}
                        ></div>
                     );
                  }
                  let style = {
                     backgroundColor: color,
                     margin: 10,
                     height: 20,
                     width: 40,
                  };
                  if (color === pencilColor) {
                     style.height = 30;
                     style.width = 50;
                  }
                  return (
                     <div
                        key={index}
                        onClick={() => {
                           setPencilColor(color);
                        }}
                        style={style}
                     ></div>
                  );
               })}
            </div>

            <canvas
               onLoad={init}
               onMouseMove={pencilMove}
               onMouseDown={pencilClick}
               onMouseUp={pencilRelease}
               id="board"
               width="800"
               height="400"
            ></canvas>
         </div>
      </div>
   );
};

export default Canvas;
