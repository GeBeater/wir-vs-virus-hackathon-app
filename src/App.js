import {ThemeProvider} from '@material-ui/core';
import {createBrowserHistory} from "history";
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';
import './App.css';
import {AppContextWrapper} from "./context/AppContext";
import {AppInitializer} from "./context/AppInitializer";
import Checkout from './pages/Checkout';
import DonationOverview from "./pages/DonationOverview";
import Home from './pages/Home';
import InvitationCode from "./pages/InvitationCode";
import SignUp from "./pages/SignUp";
import Success from "./pages/Success";
import {appTheme} from "./theme/theme";
import {CompanyContextWrapper} from './context/CompanyContext';
import PlaceResolver from './pages/PlaceResolver';
import Payout from "./pages/Payout";


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
`;

const history = createBrowserHistory();

function App() {
    return (
        <ThemeProvider theme={appTheme}>
            <AppContextWrapper>
                <CompanyContextWrapper>
                    <AppInitializer />
                    <GlobalStyle />
                    <Router history={history}>
                        <Switch>
                            <Route path="/spende/:placeIdOrSlug/:amount?">
                                <PlaceResolver/>
                            </Route>
                            <Route path="/checkout">
                                <Checkout />
                            </Route>
                            <Route path="/anmeldung">
                                <InvitationCode />
                            </Route>
                            <Route path="/success">
                                <Success />
                            </Route>
                            <Route path="/signup">
                                <SignUp />
                            </Route>
                            <Route path="/showmethemoney">
                                <DonationOverview />
                            </Route>
                            <Route path="/payout">
                                <Payout />
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </Router>
                </CompanyContextWrapper>
            </AppContextWrapper>
        </ThemeProvider>
    );
}

export default App;
