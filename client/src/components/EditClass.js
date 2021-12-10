import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./AppProvider";
import { useParams } from "react-router-dom";
import Form from "./Form";
import Input from "./Input";
import { useAuth0 } from "@auth0/auth0-react";

const EditClass = () => {
  const [formData, setFormData] = useState(null);
  const [status, setStatus] = useState(null);
  const { classes, setClasses } = useContext(AppContext);
  const { _id } = useParams();

  const { user, isAuthenticated } = useAuth0();

  const submitHandler = (event) => {
    event.preventDefault();

    fetch(`/classes/${_id}`, {
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
            changeHandler={handleFormDataChange}
            defaultValue={classes.className}
          />
          <Input
            name="price"
            type="text"
            placeholder="price "
            inputmode="numeric"
            min="0"
            steps="1"
            pattern="[0-9]+"
            changeHandler={handleFormDataChange}
            defaultValue={classes.price}
          />
          <Input
            name="category"
            type="text"
            placeholder="category"
            changeHandler={handleFormDataChange}
            defaultValue={classes.category}
          />
          <Input
            name="duration"
            type="text"
            placeholder="duration"
            inputmode="numeric"
            steps="1"
            min="0"
            pattern="[0-9]+"
            changeHandler={handleFormDataChange}
            defaultValue={classes.duration}
          />
          <Input
            name="level"
            type="text"
            placeholder="level"
            changeHandler={handleFormDataChange}
            defaultValue={classes.level}
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
