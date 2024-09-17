import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormDetailsforget() {
  const [email, setEmail] = useState("");
  const [message, setmessage] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/sendpasswordlink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    // console.log(res);
    const data = await res.json();
    // console.log(data);

    if (data.status === 201) {
      setEmail("");
      setmessage(true);
    } else {
      alert("Invalid, Id not found");
      // console.log("this: " + res);
    }
  };

  return (
    <section>
      <div className="form_data">
        {message ? (
          <p style={{ color: "green", fontWeight: "bold" }}>
            Password Reset Link has successfully sent to your email id{" "}
          </p>
        ) : (
          ""
        )}
        <form onSubmit={handleSubmit} method="post">
          <div className="form_input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              name="email"
              id="email"
              onChange={handleChange}
              placeholder="Enter Your Email Address"
            />
          </div>

          <button className="btn">Send</button>
        </form>
      </div>
    </section>
  );
}
