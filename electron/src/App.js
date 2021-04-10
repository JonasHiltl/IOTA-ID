import React from "react";
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'

import './App.css';
import CreateId from "./pages/CreateId"
import Index from "./pages/Index"
import CheckAuthenticated from "./containers/CheckAuthenticated"


function App() {
  return(
    <Router>
      <div className="App">
        <CheckAuthenticated>
          <Switch>
            <Route path="/create">
              <CreateId/>
            </Route>
            <Route exact path="/">
              <Index/>
            </Route>
          </Switch>
        </CheckAuthenticated>
      </div>
    </Router>
  )
}

export default App;