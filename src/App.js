import React from 'react';
import './App.css';
import Home from './pages/Home';

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
        </Switch>
      </Router>
    </>
  );
}

export default App;
