import './App.css';
import { 
   BrowserRouter as Router,
   Switch,
   Route,
   Link } from "react-router-dom";
import {Game,Home} from './routes'
const App = ()=>{
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
         <Route path="/game">
            <Game />
         </Route>
         <Route path="/">
            <Home />
         </Route>
      </Switch>
      </div>
   </Router>
   )
}
export default App