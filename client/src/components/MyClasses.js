import React, { useEffect, useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AppContext } from "./AppProvider";
import styled from "styled-components";

const MyClasses = () => {
  const { classes, course, setCourse } = useContext(AppContext);
  const [myClasses, setMyClasses] = useState("");
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState(null);
  const [stars, setStars] = useState(0);
  console.log(user);

  useEffect(() => {
    isAuthenticated &&
      fetch(`/orders/${user.email}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.status === 200) {
            // console.log(data);
            setMyClasses(data.data);
          }
        });
  }, [isAuthenticated]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <Wrapper>
      <CardSection>
        <h3>Welcome {user.given_name} !</h3>
        <h3>Here is a list of your classes </h3>
        <CardContainer>
          {myClasses &&
            myClasses.map((myClass) => {
              return (
                <div>
                  {" "}
                  {myClass.className}{" "}
                  <Image src={myClass.imageSrc} alt="class image" />{" "}
                </div>
              );
            })}
        </CardContainer>
      </CardSection>
    </Wrapper>
  );
};

export default MyClasses;
const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
`;

const CardSection = styled.section`
  background: thistle;
  padding: 2rem;
  gap: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: stretch; */
  width: 100%;

  h2 {
    padding: 1rem;
    margin: 0;
  }
`;

const CardContainer = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const Image = styled.img`
  display: flex;
  margin-top: 25px;
  width: 200px;
  height: 200px;
`;
