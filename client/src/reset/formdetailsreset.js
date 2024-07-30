import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function FormDetailsreset() {
  const [message, setmessage] = useState(false);
  const [password, setpassword] = useState("");
  const { id, token } = useParams();

  const handleChange = (e) => {
    setpassword(e.target.value);
    // console.log(password);
  };

  let navigate = useNavigate();
  const userValid = async () => {
    const res = await fetch(`/api/forgetpassword/${id}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.status == 201) {
      console.log("user Valid");
    } else {
      navigate("*");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== "") {
      const res = await fetch(`/api/${id}/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      // console.log(data.status);
      if (data.status == 201) {
        setpassword("");
        setmessage(true);
      } else {
        console.log(data.status);
        // alert("Token expired, generate a new link");
      }
    } else {
      alert("Enter Password");
      console.log("enter password");
    }
  };

  useEffect(() => {
    userValid();
  });

  return (
    <section>
      <div className="form_data">
        {message ? (
          <p style={{ color: "green", fontWeight: "bold" }}>
            Password Succesfully Updated{" "}
          </p>
        ) : (
          ""
        )}
        <form onSubmit={handleSubmit}>
          <div className="form_input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              name="password"
              required
              id="password"
              onChange={handleChange}
              placeholder="Enter Your Password"
            />
          </div>

          <button className="btn">Send</button>
        </form>
      </div>
    </section>
  );
}
