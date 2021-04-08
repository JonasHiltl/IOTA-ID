import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import CreateId from "./pages/CreateId"
import CreatePatientQuestionnaire from "./pages/CreatePatientQuestionnaire"
import Profile from "./pages/Profile"
import Index from "./pages/Index"
import PatientQuestionnaire from "./pages/PatientQuestionnaire"
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
              <Route path="/patient-questionnaire/create">
                <CreatePatientQuestionnaire/>
              </Route>
              <Route exact path="/patient-questionnaire">
                <PatientQuestionnaire/>
              </Route>
              <Route path="/profile">
                <Profile/>
              </Route>
              <Route exact path="/">     
                <Index/>         
              </Route>
            </MenuLayout>    
          </Switch>
        </CheckAuthenticated>
      </div>
    </Router>
  )
}

export default App;
