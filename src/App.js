import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';
import './App.css';
import Home from './pages/Home';
import InvitationCode from "./pages/InvitationCode";
import SignUp from "./pages/SignUp";
import Payment from "./pages/Payment";
import CompanyList from './pages/CompanyList';
import DonationOverview from "./pages/DonationOverview";
import BankDetails from "./pages/BankDetails";


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
          <Route path="/list">
            <CompanyList />
          </Route>
          <Route path="/getit">
            <InvitationCode />
          </Route>
          <Route path="/showmethemoney">
            <DonationOverview />
          </Route>
          <Route path="/bankdetails">
            <BankDetails />
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
