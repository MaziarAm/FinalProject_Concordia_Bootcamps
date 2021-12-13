import React from "react";
import styled from "styled-components";

const Confirmation = () => {
  return (
    <Div>
      <h2>Thank you!</h2>
      <Span>
        Your class reservation is confirmed. Our team will contact you shortly.
      </Span>
    </Div>
  );
};

export default Confirmation;

const Div = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  h2 {
    padding: 1rem;
  }
`;

const Span = styled.span`
  font-weight: bold;
  font-size: 20px;
`;
