import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Localbase from "localbase"

import "./App.css";
import CreateId from "./pages/CreateId"
import Patientenfragebogen from "./pages/Patientenfrageboge"
import MenuLayout from "./containers/MenuLayout"
import { verify } from "./store/actions/auth";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.isAuthenticated);

  let db = new Localbase("db")

  useEffect(() => {
    db.collection("identity").get().then(identity => {
      if (identity[0]) {
        console.log(identity[0])
        dispatch(verify(identity[0].id))
      }
    })
  }, [])

  return(
    <Router>
      <div className="App">
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
      </div>
    </Router>
  )
}

export default App;
