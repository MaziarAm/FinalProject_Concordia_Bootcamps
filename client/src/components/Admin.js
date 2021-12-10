import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { themeVars } from "./GlobalStyles";
import ClassCard from "./ClassCard";
import { AppContext } from "./AppProvider";
import EditClass from "./EditClass";

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

  // const handleChange = (event) => {};

  return (
    <Div>
      <h2>Admin Page</h2>
      <Div>
        <h2>All Classes</h2>
        <>
          {classes &&
            classes.map((course) => {
              return <ClassCard course={course} />;
            })}
        </>
      </Div>
      <Div>
        {/* <h2>Edit Classes</h2> */}
        {/* <Select onChange={handleChange}>
          <option selected disabled>
            Select a class
          </option>
        </Select> */}
      </Div>
    </Div>
  );
};

export default Admin;

const Div = styled.div`
  background: thistle;
  padding: 2rem;
  gap: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  h2 {
    padding: 1rem;
    margin: 0;
  }
`;

const Select = styled.select`
  /* padding: 0.7rem;
    border-radius: 0.7rem;
    border: none;
    background: ${themeVars.accent2Color};
    appearance: none;
   
    color: white;
    font-size:1.2em;
    font-weight: 700;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    position: relative;
    option {
   
    color: white;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 1rem;

    
    } */
`;
