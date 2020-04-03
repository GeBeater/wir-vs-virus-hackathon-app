import {ThemeProvider} from '@material-ui/core';
import {createBrowserHistory} from "history";
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';
import './App.css';
import {AppContextWrapper} from "./context/AppContext";
import {AppInitializer} from "./context/AppInitializer";
import Home from './pages/Home';
import PlaceResolver from './pages/PlaceResolver';
import Success from "./pages/Success";
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
`;

const history = createBrowserHistory();

function App() {
    return (
        <ThemeProvider theme={appTheme}>
            <AppContextWrapper>
                <AppInitializer />
                <GlobalStyle />
                <Router history={history}>
                    <Switch>
                        <Route path="/spende/:placeIdOrSlug/:amount?">
                            <PlaceResolver/>
                        </Route>
                        <Route path="/success">
                            <Success />
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
