import React, { useContext, useEffect, useState } from "react";
import Styled from "styled-components";
import { Link } from "react-router-dom";
import { themeVars } from "../GlobalStyles";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Login";
import LogoutButton from "./Logout";

const HeaderProfile = () => {
  const { userType, setUserType } = useContext;
  const { user, isAuthenticated } = useAuth0();

  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);

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

  return (
    <Div>
      {user ? (
        <>
          <div>
            <p>Hello, {user.firstname}</p>
            <p className="role">
              {userType.type === "admin" ? "Admin" : currentUser.type}
            </p>
          </div>
          <button className="profile-button" onClick={showProfileMenu}></button>
          {isProfileMenuVisible && (
            <div className="profile-menu">
              {userType.type === "user" ? (
                <Link to="/my-classes">My Classes</Link>
              ) : (
                <Link to="/dashboard">Dashboard</Link>
              )}
              <LogoutButton />
            </div>
          )}
        </>
      ) : (
        <LoginButton />
      )}
    </Div>
  );
};

export default HeaderProfile;

const Div = Styled.div`

position: relative;
padding: 1rem;
color: white;
display: flex;
align-items: center;
gap: 1rem;

.type {
  font-size: 0.8em;
  font-weight: 300;
  text-align: right;

}

.profile-button {
  padding: 0;
  display: flex;
  justify-content: center;
  align-items:center;
}


.profile-menu {
  position: absolute;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
  padding: 1rem;
  background: ${themeVars.darkColor};
  top: 4rem;
  right: 1rem;
  z-index: 1;
  box-shadow: ${themeVars.boxShadow};

  
  a {
    font-weight: 700;
  }

}

`;
