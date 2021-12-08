import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import HomePage from "./Homepage";
import Admin from "./Admin";
import Classes from "./Classes";
import Checkout from "./Checkout";
import Login from "./auth0/Login";
import MyClasses from "./MyClasses";
import SignUp from "./auth0/SignUp";
import styled from "styled-components";
import Logout from "./auth0/Logout";
import Header from "./Header";
import About from "./About";
import Contact from "./Contact";
import Confirmation from "./Confirmation";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Main>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/classes/:_id">
            <Classes />
          </Route>
          <Route exact path="/checkout">
            {isAuthenticated ? <Checkout /> : <Redirect to="/auth-error" />}
          </Route>
          <Route exact path="/confirmation">
            <Confirmation />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/my-classes">
            <MyClasses />
          </Route>
          <Route exact path="/dashboard">
            <Admin />
          </Route>
          <Route path="/auth-error">
            <div> Please login to continue!</div>
          </Route>
          <Route path="">404: Page Not found!</Route>
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
