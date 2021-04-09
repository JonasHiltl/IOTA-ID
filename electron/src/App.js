import React from "react";
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'

import './App.css';
import CreateId from "./pages/CreateId"
import Index from "./pages/Index"


function App() {
  return(
    <Router>
      <div className="App">
        <Switch>
         <Route path="/create">
          <CreateId/>
         </Route>
         <Route exact path="/">
          <Index/>
         </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;