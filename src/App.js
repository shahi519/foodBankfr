import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import RecipieList from "./components/recipie-list.component";

function App() {
  return (
    <Router>
      <div className="container-fluid">
      <Route path="/menulist" exact component={RecipieList}/>
      </div>
    </Router>
  );
}

export default App;
