import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Form from "./Form";
import Input from "./Input";
import { useAuth0 } from "@auth0/auth0-react";
import { AppContext } from "./AppProvider";

const CheckOut = () => {
  const { classes, course, setCourse, update, setUpdate } =
    useContext(AppContext);
  //   console.log(course);
  const { user, isAuthenticated } = useAuth0();
  //   console.log(user);
  const history = useHistory();

  const handleFormChange = (ev) => {
    return ev.target.value;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const { _id, className, price, category, duration, level, imageSrc } =
      course;
    const reqBody = {
      email: user.email,
      course_id: _id,
      className,
      price,
      category,
      duration,
      level,
      imageSrc,
    };
    fetch("/orders", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === 200) {
          setUpdate(!update);
          history.push("/confirmation");
        } else if (data.status === 400) {
          window.alert("Sorry,this class is full!");
        }
      });
  };

  return (
    <Div>
      <>
        <Form submitHandler={submitHandler}>
          <p>Please fill out this form</p>
          <Input
            name="firstname"
            type="text"
            required={true}
            onChange={(ev) => handleFormChange}
          />
          <Input
            name="lastname"
            type="text"
            required={true}
            onChange={(ev) => handleFormChange}
          />

          <Input
            name="creditCard"
            placeholder="Credit Card"
            type="tel"
            required={true}
            inputmode="numeric"
            pattern="[0-9\s]{13,19}"
            onChange={(ev) => handleFormChange}
          />
          <Input
            name="expirationDate"
            placeholder="Expiration Date"
            type="tel"
            required={true}
            inputmode="numeric"
            pattern="[0-9\s]{4}"
            onChange={(ev) => handleFormChange}
          />
          <button type="submit">Submit</button>
        </Form>
      </>
    </Div>
  );
};

export default CheckOut;

const Div = styled.div`
  padding: 2rem;
  border-radius: 1rem;
`;
