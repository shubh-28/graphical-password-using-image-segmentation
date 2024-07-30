import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormDetailscontact() {
  const [values, setValues] = useState({
    username: "",
    place: "",
    feedback: "",
    email: "",
    number: "",
  });

  const handleChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      values.username !== "" &&
      values.place !== "" &&
      values.feedback !== "" &&
      values.number !== "" &&
      values.email !== ""
    ) {
      const { username, place, feedback, email, number } = values;

      const data = await fetch("/api/contact", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          place: place,
          feedback: feedback,
          email: email,
          number: number,
        }),
      });
      const res = await data.json();
      if (res.status === 201) {
        alert("Your form is submitted to us successfully");
        setValues({
          ...values,
          username: "",
          place: "",
          feedback: "",
          number: "",
          email: "",
        });
        navigate("/dash");
      } else {
        alert("form details are not yours");
      }
    } else {
      alert("Please fill all the data");
    }
  };

  let navigate = useNavigate();
  const routeChangedash = () => {
    let path = `../dash`;
    navigate(path);
  };

  return (
    <div className="details">
      <h2>LET US CONTACT YOU</h2>
      <form className="reg" method="post" onSubmit={handleSubmit}>
        <div className="first">
          <div className="forErr">
            <input
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              placeholder="Your User Name"
              required
            />
          </div>
        </div>
        <div className="first">
          <div id="email" className="forErr">
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
          </div>
        </div>
        <div className="first">
          <div className="forErr">
            <input
              type="number"
              name="number"
              value={values.number}
              onChange={handleChange}
              maxLength="10"
              required
              placeholder="Your Mobile Number"
            />
          </div>
        </div>
        <div className="first">
          <div className="forErr">
            <input
              type="text"
              name="place"
              value={values.place}
              onChange={handleChange}
              required
              placeholder="City"
            />
          </div>
        </div>
        <div className="first">
          <div className="forErr">
            <textarea
              rows="6"
              cols="60"
              name="feedback"
              value={values.feedback}
              onChange={handleChange}
              required
              placeholder="Please share your feedback what can we improve"
            />
          </div>
        </div>
        <div id="btnR">
          <button className="btn1" type="submit">
            Submit
          </button>
          <button className="btn1" type="submit" onClick={routeChangedash}>
            Home
          </button>
        </div>
      </form>
    </div>
  );
}
