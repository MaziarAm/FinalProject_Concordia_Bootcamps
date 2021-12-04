import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Homepage from "./Homepage";
import styled from "styled-components";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Main>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
        </Switch>
      </Main>
    </BrowserRouter>
  );
};

export default App;
const Main = styled.div`
  display: flex;
  /* flex-direction: column; */
  height: max-content;
  width: 100vw;
  /* background-color: gray; */
`;
