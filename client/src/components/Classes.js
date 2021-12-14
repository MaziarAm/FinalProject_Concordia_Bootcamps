import React, { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "./AppProvider";
import styled from "styled-components";
import Review from "./Review";
import Form from "./Form";
import ReactStars from "react-rating-stars-component";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./Loading";

const Classes = () => {
  const { classes, course, setCourse, currentUser, setCurrentUser } =
    useContext(AppContext);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState(null);
  const [update, setUpdate] = useState(false);
  const [stars, setStars] = useState(0);
  const { user, isAuthenticated } = useAuth0();
  console.log(user);

  const { _id } = useParams();

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setStars(newRating);
  };
  const handleFormChange = (ev) => {
    setMessage(ev.target.value);
  };

  useEffect(() => {
    fetch(`/classes/${_id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setCourse(data.data);
      });
  }, [_id, update]);

  const submitReviewHandler = (event) => {
    event.preventDefault();
    fetch(`/classes/${_id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: message, stars, name: user.name }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          setUpdate(!update);
        }
      });
  };
  console.log(currentUser);

  if (!course || !currentUser) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <CardSection>
        <CardContainer>
          {course && (
            <div key={course._id}>
              <Div2>
                <h3>{course.className}</h3>
                <p> price: ${course.price} </p>
                <p> Language: {course.category} </p>
                <p>Class duration: {course.duration} minutes </p>
                <p>Level: {course.level} </p>
                <Image src={course.imageSrc} alt="class pic" />
                {/* <p> Availablity: {course.availability} </p> */}
              </Div2>
              <div>
                {currentUser && currentUser.classes?.includes(course._id) ? (
                  <div
                    style={{
                      fontStyle: "italic",
                      fontWeight: "bold",
                      fontSize: "1.1em",
                      marginTop: "10px",
                    }}
                  >
                    <Div2>You have already registered for this class!</Div2>
                  </div>
                ) : (
                  <Div>
                    {course.availability ? (
                      <Link className="primary-button" to={"/checkout"}>
                        Reserve now
                      </Link>
                    ) : (
                      <h3>Class is full !</h3>
                    )}
                  </Div>
                )}
              </div>

              <FormContainer>
                <Form submitHandler={submitReviewHandler}>
                  <ReactStars
                    count={5}
                    edit={true}
                    value={stars}
                    size={24}
                    isHalf={true}
                    activeColor="#ffd700"
                    onChange={ratingChanged}
                  />
                  <textarea onChange={handleFormChange} name="text"></textarea>
                  <button type="submit">Submit</button>
                </Form>
              </FormContainer>

              {course.reviews.map((review) => {
                return (
                  <Section>
                    <Review review={review} />
                  </Section>
                );
              })}
            </div>
          )}
        </CardContainer>
      </CardSection>
    </Wrapper>
  );
};

export default Classes;

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;

  h2 {
    padding: 1rem;
    margin: 0;
  }
`;
const CardSection = styled.section`
  padding: 2rem;
  gap: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Image = styled.img`
  margin-top: 10px;
  width: 200px;
  height: 200px;
`;

const CardContainer = styled.section`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const Section = styled.section`
  border-top: 1px solid lightgray;
  display: flex;
  justify-content: center;
`;

const Div = styled.div`
  padding-block: 1rem;
  display: flex;
  justify-content: center;
`;

const FormContainer = styled.div``;

const Div2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
