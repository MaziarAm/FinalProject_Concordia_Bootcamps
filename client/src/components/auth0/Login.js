import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <StyledButton
      className="btn btn-primary btn-block"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </StyledButton>
  );
};

const StyledButton = styled.button`
  width: 125px;
  background: none;
  font-size: 1.2rem;
  padding: 12px 0;
  background-color: tomato;
  border: 2px solid;
  border-radius: 5px;
  color: #fff;

  cursor: pointer;
  &:hover {
    background-color: #fff;
    border: 2px solid #000;
    color: #000;
    transition: 0.3s ease-in-out all;
  }
`;

export default LoginButton;
