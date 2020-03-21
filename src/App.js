import React from 'react';
import './App.css';
import Home from './pages/Home';

import { createGlobalStyle } from 'styled-components'

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
      <GlobalStyle/>
      <Home></Home>
    </>
  );
}

export default App;
