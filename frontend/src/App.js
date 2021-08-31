import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Homepage from './components/Homepage/Homepage'

import LogOrsign from './components/Login-Signup/LogOrsign'
import Signup from './components/Login-Signup/Signup'
import Navbar from './components/Navbar/Navbar';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <Route path ="/" exact render={props=><Navbar{...props}/>}/> */}
          <Route path="/" exact render={props => <Homepage {...props} />} />
          <Route path="/login" render={props => <LogOrsign {...props} />} />
          <Route path="/register" render={props => <Signup {...props} />} />
      
        </Switch>
      </Router>
    </div>

  );
}

export default App;
