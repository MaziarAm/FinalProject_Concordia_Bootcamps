import React, { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "./AppProvider";
import styled from "styled-components";
import Review from "./Review";
import Form from "./Form";
import ReactStars from "react-rating-stars-component";
import { useAuth0 } from "@auth0/auth0-react";

const Classes = () => {
  const { classes, course, setCourse } = useContext(AppContext);
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

  return (
    <Div>
      {course && (
        <div key={course._id}>
          <p style={{ color: "black" }}>{course.className}</p>
          <p> price: ${course.price} </p>
          <p> Language: {course.category} </p>
          <p>Class duration: {course.duration} minutes </p>
          <p>Level: {course.level} </p>
          <Image src={course.imageSrc} alt="class pic" />
          <p> Availablity: {course.availability} </p>
          <div>
            <Link className="primary-button" to={"/checkout"}>
              Reserve now
            </Link>
          </div>
          <div>
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
          </div>
          {course.reviews.map((review) => {
            return (
              <div>
                <Review review={review} />;
              </div>
            );
          })}
        </div>
      )}
    </Div>
  );
};

export default Classes;

const Div = styled.div`
  .buttons {
    padding-block: 1rem;
    display: flex;
    justify-content: center;
  }
`;

const Image = styled.img`
  display: flex;
  margin-top: 25px;
  width: 100px;
  height: 100px;
`;
