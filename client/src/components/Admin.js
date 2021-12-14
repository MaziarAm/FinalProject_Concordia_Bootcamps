import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { themeVars } from "./GlobalStyles";
import ClassCard from "./ClassCard";
import { AppContext } from "./AppProvider";
import EditClass from "./EditClass";
import Loading from "./Loading";

const Admin = () => {
  const { classes, setClasses } = useContext(AppContext);
  const [update, setUpdate] = useState(false);
  const { _id } = useParams();

  useEffect(() => {
    fetch(`/classes/`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClasses(data.data);
      });
  }, [update]);

  if (!classes) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <h2>Admin Page</h2>
      <CardSection>
        <h2>All Classes</h2>
        <CardContainer>
          {classes &&
            classes.map((course) => {
              return (
                <ClassCard
                  update={update}
                  setUpdate={setUpdate}
                  course={course}
                />
              );
            })}
        </CardContainer>
      </CardSection>
    </Wrapper>
  );
};

export default Admin;

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
