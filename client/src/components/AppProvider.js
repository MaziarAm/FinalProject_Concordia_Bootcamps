import React, { useState, createContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [classes, setClasses] = useState(null);
  const [userType, setUserType] = useState(null);
  const [course, setCourse] = useState(null);
  const { user, isAuthenticated } = useAuth0();
  const [filter, setFilter] = useState("en");

  // console.log(user);
  useEffect(() => {
    fetch("/classes")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setClasses(data.data);
      });
  }, []);

  useEffect(() => {
    isAuthenticated &&
      fetch(`/users/email/${user.email}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // console.log(data);
          if (data.status === 200) {
            setUserType(data.data.type);
            return null;
          } else {
            // console.log("test");
            return fetch("/users/email", {
              method: "POST",
              body: JSON.stringify({ email: user.email }),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            });
          }
        })

        .then((res) => {
          if (res) {
            return res.json();
          }
        })
        .then((json) => {
          // console.log(json);
          if (json) {
            setUserType("user");
          }
        });
  }, [isAuthenticated]);

  const filterClasses = (key, value) => {
    let filteredClasses = classes.filter((course) => {
      return course[key] === value;
    });
    setClasses(filteredClasses);
  };

  return (
    <AppContext.Provider
      value={{ classes, userType, course, setCourse, filterClasses }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
