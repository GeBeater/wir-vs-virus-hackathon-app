import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';
import './App.css';
import ForgotPw from "./pages/ForgotPw";
import SignUp from "./pages/SignUp";
import CompanyList from './pages/CompanyList';
import Home from './pages/Home';
import Payment from "./pages/Payment";
import SignIn from "./pages/SignIn";


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
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/forgotpw">
            <ForgotPw />
          </Route>
          <Route path="/list">
            <CompanyList />
          </Route>
          <Route path="/payment">
            <Payment />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
