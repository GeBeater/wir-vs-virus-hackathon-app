import React from 'react';
import './App.css';
import Home from './pages/Home';
import ForgotPw from "./pages/ForgotPw";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

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
          <Route path="/">
            <Home />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/forgotpw">
            <ForgotPw />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
