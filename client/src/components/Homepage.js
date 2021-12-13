import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./AppProvider";
import { Link } from "react-router-dom";
import SortDropdown from "./SortDropdown";
import Loading from "./Loading";
import { themeVars } from "./GlobalStyles";

const HomePage = () => {
  const { classes, filterClasses } = useContext(AppContext);
  return (
    <Wrapper>
      <h2>Our Classes</h2>
      <Section>
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
        <SortDropdown style={{ position: "absolute" }} />
        <UL>
          <Li>
            {classes ? (
              classes.map((course) => {
                return (
                  <Div key={course._id}>
                    <Link style={{}} to={`/classes/${course._id}`}>
                      <H3>{course.className}</H3>

                      <p style={{ color: "black" }}> price: ${course.price} </p>
                      <p style={{ color: "black" }}>
                        Language: {course.category}{" "}
                      </p>
                      <p style={{ color: "black" }}>
                        Class duration: {course.duration} minutes{" "}
                      </p>
                      <p style={{ color: "black" }}>Level: {course.level} </p>
                      <p style={{ color: "black" }}>
                        Availablity: {course.availability}{" "}
                      </p>
                      <Image src={course.imageSrc} alt="class image" />
                    </Link>
                  </Div>
                );
              })
            ) : (
              <Loading />
            )}
          </Li>
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
  margin: 0 auto;
  max-width: 800px;
  border-radius: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`;
const Image = styled.img`
  margin-top: 10px;
  width: 200px;
  height: 200px;
`;
const UL = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Li = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3rem;
  justify-items: center;
`;

const H3 = styled.h3`

  text-align: left;
  line-height: 1.3em;


}`;

const Div = styled.div`
  font-size: 1.1em;
  padding: 2em;
  border-radius: 1rem;
  box-shadow: ${themeVars.boxShadow};
`;
