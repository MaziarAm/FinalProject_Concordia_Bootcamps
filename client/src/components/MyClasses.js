import React, { useEffect, useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AppContext } from "./AppProvider";
import Form from "./Form";
import ReactStars from "react-rating-stars-component";
import Review from "./Review";

const MyClasses = () => {
  const { classes, course, setCourse } = useContext(AppContext);
  const [myClasses, setMyClasses] = useState("");
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState(null);
  const [stars, setStars] = useState(0);
  // console.log(user);

  // const ratingChanged = (newRating) => {
  //   console.log(newRating);
  // };
  // const handleFormChange = (ev) => {
  //   setMessage(ev.target.value);
  // };

  useEffect(() => {
    isAuthenticated &&
      fetch(`/orders/${user.email}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.status === 200) {
            // console.log(data);
            setMyClasses(data.data);
          }
        });
  }, [isAuthenticated]);

  // const submitReviewHandler = (event) => {
  //   event.preventDefault();
  //   fetch(`/classes/${user.course}`, {
  //     method: "PATCH",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(),
  //   })
  //     .then((res) => res.json())
  //     .then((json) => {
  //       if (json.status === 200) {
  //         setMessage("Review Added.");
  //       }
  //     });
  // };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      {myClasses &&
        myClasses.map((myClass) => {
          return <div> {myClass.className} </div>;
        })}
      {/* <Form submitHandler={submitReviewHandler}>
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
      </Form> */}
    </>
  );
};

export default MyClasses;

// <div>
//   <h2>{user.name}</h2>
//   <p>{user.email}</p>
// </div>
