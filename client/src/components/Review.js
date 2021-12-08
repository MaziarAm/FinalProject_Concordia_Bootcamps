import React from "react";
import styled from "styled-components";
import ReactStars from "react-rating-stars-component";

import { render } from "react-dom";

const Review = ({ review }) => {
  const { text, stars } = review;
  return (
    <Div>
      <p>{text}</p>
      <ReactStars
        count={5}
        value={stars}
        edit={false}
        size={24}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
      />
    </Div>
  );
};

export default Review;

const Div = styled.div`
  background: aliceblue;
  padding: 1rem;
  border-radius: 1rem;
`;
