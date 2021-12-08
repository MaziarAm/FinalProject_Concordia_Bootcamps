import React, { useContext, useState, useEffect } from "react";
import LoginButton from "./Login";
import LogoutButton from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AppProvider, { AppContext } from "../AppProvider";

const AuthenticationButton = () => {
  const { userType, setUserType } = useContext(AppContext);
  const { user, isAuthenticated } = useAuth0();
  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);
  // console.log(userType);
  useEffect(() => {
    setIsProfileMenuVisible(false);
  }, []);

  const showProfileMenu = () => {
    setIsProfileMenuVisible(true);
  };

  const handleClick = () => {
    if (isProfileMenuVisible) {
      setIsProfileMenuVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [isProfileMenuVisible]);

  return isAuthenticated ? (
    <StyledDiv>
      <>
        <div>
          <p>Hello, {user.firstname}</p>
          <p className="role">{userType === "admin" ? "Admin" : ""}</p>
        </div>
        <button className="profile-button" onClick={showProfileMenu}></button>
        {isProfileMenuVisible && (
          <div className="profile-menu">
            {userType === "user" ? (
              <Link to="/my-classes">My Classes</Link>
            ) : (
              <Link to="/dashboard">Dashboard</Link>
            )}
            <LogoutButton />
          </div>
        )}
      </>

      <Img src={user.picture} alt="" />
    </StyledDiv>
  ) : (
    <LoginButton />
  );
};

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Img = styled.img`
  display: block;
  border-radius: 25px;
`;

export default AuthenticationButton;
