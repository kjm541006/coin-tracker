import React from "react";
import { createGlobalStyle } from "styled-components";
import "./App.css";
import Router from "./Router";

const GlobalStyle = createGlobalStyle`
  body{
    background-color:skyblue;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
