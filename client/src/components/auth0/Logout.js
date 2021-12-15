import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <StyledButton
      className="btn btn-danger btn-block"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Log Out
    </StyledButton>
  );
};

const StyledButton = styled.button`
  margin: 1rem;
  width: 125px;
  background: none;
  font-size: 1.2rem;
  padding: 12px 0;
  background-color: #ffffff;
  border: 2px solid #2f3437;
  border-radius: 5px;
  color: #2f3437;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    border: 2px solid #2f3437;
    transition: 0.3s ease-in-out all;
  }
`;
export default LogoutButton;
