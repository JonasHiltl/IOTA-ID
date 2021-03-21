import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import CreateId from "./pages/CreateId"
import Patientenfragebogen from "./pages/Patientenfrageboge"
import MenuLayout from "./containers/MenuLayout"

function App() {
  return(
    <Router>
      <div className="App">
        <Switch>
          <Route path="/signup">
            <CreateId/>
          </Route>        
          <Route path="/patientenfragebogen">
            <MenuLayout>
              <Patientenfragebogen/>
            </MenuLayout>
          </Route>
          <Route exact path="/">
            <MenuLayout>
              
            </MenuLayout>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
