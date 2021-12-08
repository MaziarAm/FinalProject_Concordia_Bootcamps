import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { themeVars } from "./GlobalStyles";
import { AppContext } from "./AppProvider";
import { useAuth0 } from "@auth0/auth0-react";
import AuthenticationButton from "../components/auth0/authentication-btn";

const Header = () => {
  //   const { currentUser } = useAuth0();

  return (
    <>
      <StyledHeader>
        <Nav>
          <Link to="/">
            <h1 className="site-title">
              <span>Site name</span>
            </h1>
          </Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </Nav>

        <AuthenticationButton />
      </StyledHeader>
    </>
  );
};

export default Header;

const StyledHeader = styled.header`
  flex: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${themeVars.primaryColor};
  min-height: 6rem;
  font-weight: 900;
`;

const Nav = styled.nav`
  padding: 1rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 2rem;
`;
