import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./AppProvider";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { classes, filterClasses } = useContext(AppContext);
  return (
    <Div>
      <Section>
        <h2>Classes</h2>
        <button
          onClick={() => {
            filterClasses("category", "french");
          }}
        >
          French
        </button>
        <button
          onClick={() => {
            filterClasses("category", "english");
          }}
        >
          English
        </button>
        <button
          onClick={() => {
            filterClasses("category", "both");
          }}
        >
          English and French
        </button>
        <UL>
          {classes &&
            classes.map((course) => {
              return (
                <div key={course._id}>
                  <Link to={`/classes/${course._id}`}>
                    <p style={{ color: "black" }}>{course.className}</p>
                  </Link>
                  <p> price: ${course.price} </p>
                  <p> Language: {course.category} </p>
                  <p>Class duration: {course.duration} minutes </p>
                  <p>Level: {course.level} </p>
                  <Image src={course.imageSrc} alt="class pic" />
                  <p> Availablity: {course.availability} </p>
                </div>
              );
            })}
        </UL>
      </Section>
    </Div>
  );
};

export default HomePage;

const Div = styled.div``;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  display: flex;
  margin-top: 25px;
  width: 100px;
  height: 100px;
`;
const UL = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding-right: 2rem;
  padding-left: 2rem;
`;
