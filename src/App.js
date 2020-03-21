import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';
import {ThemeProvider} from '@material-ui/core';
import './App.css';
import Home from './pages/Home';
import InvitationCode from "./pages/InvitationCode";
import SignUp from "./pages/SignUp";
import Payment from "./pages/Payment";
import CompanyList from './pages/CompanyList';

import {AppContextWrapper} from "./context/AppContext";
import {AppInitializer} from "./context/AppInitializer";
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

function App() {
  return (
      <ThemeProvider theme={appTheme}>
          <AppContextWrapper>
              <AppInitializer />
              <GlobalStyle />
              <Router>
                  <Switch>
                      <Route path="/signup">
                          <SignUp />
                      </Route>
                      <Route path="/list">
                          <CompanyList />
                      </Route>
                      <Route path="/getit">
                          <InvitationCode />
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
