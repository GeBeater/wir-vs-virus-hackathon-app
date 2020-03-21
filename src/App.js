import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';
import {ThemeProvider} from '@material-ui/core';
import './App.css';
import Nav from "./pages/Nav";
import Home from './pages/Home';
import InvitationCode from "./pages/InvitationCode";
import SignUp from "./pages/SignUp";
import Payment from "./pages/Payment";
import CompanyList from './pages/CompanyList';
import DonationOverview from "./pages/DonationOverview";
import PayoutDetails from "./pages/BankingDetails";

import {AppContextWrapper} from "./context/AppContext";
import {AppInitializer} from "./context/AppInitializer";
import {createBrowserHistory} from "history";
import {appTheme} from "./theme/theme";

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
const history = createBrowserHistory();

function App() {
  return (
      <ThemeProvider theme={appTheme}>
          <AppContextWrapper>
              <AppInitializer />
              <GlobalStyle />
              <Router history={history}>
                  <Switch>
                      <Route path="/nav">
                          <Nav />
                      </Route>
                      <Route path="/list">
                          <CompanyList />
                      </Route>
                      <Route path="/getit">
                          <InvitationCode />
                      </Route>
                      <Route path="/signup">
                          <SignUp />
                      </Route>
                      <Route path="/showmethemoney">
                          <DonationOverview />
                      </Route>
                      <Route path="/payoutdetails">
                          <PayoutDetails />
                      </Route>
                      <Route path="/payment">
                          <Payment />
                      </Route>
                      <Route path="/">
                          <Home />
                      </Route>
                  </Switch>
              </Router>
          </AppContextWrapper>
      </ThemeProvider>
  );
}

export default App;
