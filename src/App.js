import React from 'react';
import './App.css';
import Home from './pages/Home';
import InvitationCode from "./pages/InvitationCode";
import SignUp from "./pages/SignUp";
import Payment from "./pages/Payment";

import {createGlobalStyle} from 'styled-components'
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}
  body,html,#root {
    margin : 0px;
    padding:0;
    height: 100%;
    width: 100%;
  }
`

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/getit">
            <InvitationCode />
          </Route>
          <Route path="/payment">
            <Payment/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
