import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import CreateId from "./pages/CreateId"
import Patientenfragebogen from "./pages/Patientenfrageboge"
import MenuLayout from "./containers/MenuLayout"
import CheckAuthenticated from "./containers/CheckAuthenticated"

function App() {
  return(
    <Router>
      <div className="App">
        <CheckAuthenticated>
          <Switch>
            <Route path="/signup">
              <CreateId/>
            </Route>    
            <MenuLayout>
              <Route path="/patientenfragebogen">
                <Patientenfragebogen/>
              </Route>
              <Route exact path="/">              
              </Route>
            </MenuLayout>    
          </Switch>
        </CheckAuthenticated>
      </div>
    </Router>
  )
}

export default App;
