import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./AppProvider";
import Form from "./Form";
import Input from "./Input";
import { useAuth0 } from "@auth0/auth0-react";

const EditClass = ({ course, update, setUpdate, setEditMode }) => {
  const [formData, setFormData] = useState({});
  const { classes, setClasses } = useContext(AppContext);

  const { user, isAuthenticated } = useAuth0();

  const submitHandler = (event) => {
    event.preventDefault();

    fetch(`/classes/class/${course._id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          console.log(json);
          setUpdate(!update);
          setEditMode(false);
        }
      });
  };

  const handleFormDataChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setFormData(() => {
      return { ...formData, [key]: value };
    });
  };

  return (
    <>
      <Div>
        <Form submitHandler={submitHandler}>
          <h2>Edit Class Info</h2>
          <Input
            name="classname"
            type="text"
            placeholder="Class Title"
            handleFormDataChange={handleFormDataChange}
            defaultValue={course.className}
          />
          <Input
            name="price"
            type="text"
            placeholder="price "
            handleFormDataChange={handleFormDataChange}
            defaultValue={course.price}
          />
          <Input
            name="category"
            type="text"
            placeholder="category"
            handleFormDataChange={handleFormDataChange}
            defaultValue={course.category}
          />
          <Input
            name="duration"
            type="text"
            placeholder="duration"
            handleFormDataChange={handleFormDataChange}
            defaultValue={course.duration}
          />
          <Input
            name="level"
            type="text"
            placeholder="level"
            handleFormDataChange={handleFormDataChange}
            defaultValue={course.level}
          />
          <button type="submit" className="primary-button">
            Update
          </button>
        </Form>
      </Div>
    </>
  );
};

export default EditClass;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .padded {
    padding: 2rem;
  }
`;
