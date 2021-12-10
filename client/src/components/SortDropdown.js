import React, { useContext } from "react";
import styled from "styled-components";
import { themeVars } from "./GlobalStyles";
import { AppContext } from "./AppProvider";

export const SortDropdown = () => {
  const { classes, setClasses } = useContext(AppContext);
  console.log(setClasses);

  const handleChangeFilter = (ev) => {
    fetch("/classes")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        console.log(setClasses);
        if (ev.target.value === "AtoZ") {
          const sortedArray = data.data.sort((course1, course2) => {
            console.log(course1, course2);
            var nameA = course1.className.toUpperCase(); // ignore upper and lowercase
            var nameB = course2.className.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            // names must be equal
            return 0;
          });
          setClasses(sortedArray);
        } else if (ev.target.value === "ZtoA") {
          const sortedArray = data.data.sort((course1, course2) => {
            console.log(course1, course2);
            var nameA = course1.className.toUpperCase(); // ignore upper and lowercase
            var nameB = course2.className.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return 1;
            }
            if (nameA > nameB) {
              return -1;
            }

            // names must be equal
            return 0;
          });
          setClasses(sortedArray);
        } else if (ev.target.value === "priceHighToLow") {
          const sortedArray = data.data.sort((course1, course2) => {
            return course2.price - course1.price;
          });
          setClasses(sortedArray);
        } else if (ev.target.value === "priceLowToHigh") {
          const sortedArray = data.data.sort((course1, course2) => {
            return course1.price - course2.price;
          });
          setClasses(sortedArray);
        }
      });
  };
  return (
    <Div>
      <Select className="sort-dropdown" onChange={handleChangeFilter}>
        <option value="" disabled selected>
          Sort By:
        </option>
        <option value="priceHighToLow">Price - Highest to Lowest</option>
        <option value="priceLowToHigh">Price - Lowest to Highest</option>
        <option value="AtoZ">Class Name - A to Z</option>
        <option value="ZtoA">Class Name - Z to A</option>
      </Select>
    </Div>
  );
};

export default SortDropdown;

const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .label {
    font-size: 1.2em;
    font-weight: 700;
    color: gray;
  }
`;

const Select = styled.select`
  padding: 0.7rem;
  border-radius: 0.7rem;
  border: none;
  background: ${themeVars.accent2Color};
  appearance: none;
  color: white;
  font-size: 1.2em;
  font-weight: 700;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: relative;

  option {
    color: white;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 1rem;

    &:disabled {
      display: none;
      background: none;
      color: lightgray;
    }
  }
`;
