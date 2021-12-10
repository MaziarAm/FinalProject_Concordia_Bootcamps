import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./AppProvider";
import { Link } from "react-router-dom";
import SortDropdown from "./SortDropdown";

const HomePage = () => {
  const { classes, filterClasses } = useContext(AppContext);
  return (
    <Wrapper>
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
        <SortDropdown />
        <UL>
          {classes &&
            classes.map((course) => {
              return (
                <div key={course._id}>
                  <Link to={`/classes/${course._id}`}>
                    <p style={{ color: "black" }}>{course.className}</p>

                    <p style={{ color: "black" }}> price: ${course.price} </p>
                    <p style={{ color: "black" }}>
                      {" "}
                      Language: {course.category}{" "}
                    </p>
                    <p style={{ color: "black" }}>
                      Class duration: {course.duration} minutes{" "}
                    </p>
                    <p style={{ color: "black" }}>Level: {course.level} </p>
                    <Image src={course.imageSrc} alt="class image" />
                    <p style={{ color: "black" }}>
                      {" "}
                      Availablity: {course.availability}{" "}
                    </p>
                  </Link>
                </div>
              );
            })}
        </UL>
      </Section>
    </Wrapper>
  );
};

export default HomePage;

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
`;

const Section = styled.section`
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
const Image = styled.img`
  display: flex;
  margin-top: 25px;
  width: 100px;
  height: 100px;
`;
const UL = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;
