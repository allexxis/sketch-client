import {useState,useEffect} from 'react'
import { 
   BrowserRouter as Router,
   Switch,
   Route,
   Link } from "react-router-dom";
import {Game,Home} from './routes';
import './App.css';

const App = ()=>{
   const [username,setUsername] = useState(null);
   
   useEffect(()=>{
      if(localStorage.getItem('username')){
         setUsername(localStorage.getItem('username'))
      }
   },[])
   return (
      <Router>
      <div>
      <nav>
         <ul>
            <li>
            <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/game">Game</Link>
            </li>
         </ul>
      </nav>
      <Switch>
         <Route path="/game/:id">
            <Game />
         </Route>
         <Route path="/">
            <Home username={username} setUsername={setUsername}/>
         </Route>
      </Switch>
      </div>
   </Router>
   )
}
export default App