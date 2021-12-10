import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { themeVars } from "./GlobalStyles";
import EditClass from "./EditClass";
import { AppContext } from "./AppProvider";

const ClassCard = ({ course }) => {
  const { classes, setClasses } = useContext(AppContext);
  const [editMode, setEditMode] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const deleteHandler = (event) => {
    const _id = event.target.value;
    fetch(`/classes/$${_id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === 200) {
          setRefresh((refresh) => refresh + 1);
        }
      });
  };

  return (
    <>
      {" "}
      {editMode ? (
        <EditClass />
      ) : (
        <Div className="class-Info">
          <h3>Class Info</h3>
          <h4>Title: </h4>
          <p className="classname"> {course.className}</p>
          <h4>Price:</h4>
          <p>${course.price}</p>
          <h4>category:</h4>
          <p>{course.category}</p>
          <h4>Duration:</h4>
          <p>{course.duration} minutes</p>
          <h4>Level:</h4>
          <p>{course.level}</p>
        </Div>
      )}
      <button onClick={deleteHandler}>Delete</button>
      <button className="edit-button" onClick={() => setEditMode(!editMode)}>
        Edit
      </button>
    </>
  );
};

export default ClassCard;

const Div = styled.div`
  background: white;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border-radius: 1rem;
  justify-content: flex-start;
  align-items: flex-start;
  box-shadow: ${themeVars.boxShadow};

  h2 {
    margin: 0;
    padding: 0;
  }

  .edit-button {
    background: skyblue;
    align-self: center;
  }
`;
