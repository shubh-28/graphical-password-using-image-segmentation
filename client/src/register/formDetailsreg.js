import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export default function FormDetailsreg() {
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
    number: "",
  });

  const validation = (values) => {
    const errors = {};
    let flag = true;
    let usernm1 = /^(?=.*[0-9])/;
    if (values.username.length < 5 || values.username.length > 10) {
      errors.username = "range is between 5 to 10 characters";
    } else if (!values.username.match(usernm1)) {
      errors.username = "include atleast 1 number";
    }

    let paswd1 = /^(?=.*[0-9])/;
    let paswd2 = /^(?=.*[!@#$%^&*])/;
    if (values.password.length < 7 || values.password.length > 15) {
      errors.password = "range is between 7 to 15 characters";
    } else if (!values.password.match(paswd2)) {
      errors.password = "include atleast 1 special character";
    } else if (!values.password.match(paswd1)) {
      errors.password = "include atleast 1 Number";
    }

    let mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!values.email.match(mail)) {
      errors.email = "invalid mail";
    }

    let nmbr = /^\d{10}$/;
    if (!values.number.match(nmbr)) {
      errors.number = "invalid number";
    }

    // console.log(errors);
    if (Object.keys(errors).length !== 0) {
      flag = false;
    }
    return [errors, flag];
  };

  const handleChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    let flag = true;
    flag = validation(values)[1];
    setErrors(validation(values)[0]);
    e.preventDefault();
    // // console.log("this is flag: " + validation(values)[1]);
    // // console.log("flag: " + flag);

    if (
      Object.keys(errors).length === 0 &&
      values.username !== "" &&
      values.password !== "" &&
      values.number !== "" &&
      values.email !== "" &&
      flag === true
    ) {
      const { username, password, email, number } = values;
      const res = await fetch(BACKEND_URL + "/api/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          number: number,
        }),
      });
      const data = await res.json();

      // // console.log(data);
      // // console.log(res.status);
      if (res.status === 404 || !data) {
        alert("this is already used, please select something different");
        // console.log("invalid registration");
      } else {
        alert(
          "Registration step 1 is completed, now enter an image for Graphical Password..."
        );
        navigate("/imgreg", { state: { username: username } });
        setValues({
          ...values,
          username: "",
          password: "",
          number: "",
          email: "",
        });
      }
    } else {
      alert("Solve the errors before submit");
    }
  };

  const routeChangelogin = () => {
    let path = `../login`;
    navigate(path);
  };

  return (
    <div>
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
            {errors.username && (
              <>
                <span className="err" style={{ color: "red" }}>
                  {errors.username}
                </span>
              </>
            )}
          </div>

          <div id="email" className="forErr">
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
            {errors.email && (
              <>
                <span className="err" style={{ color: "red" }}>
                  {errors.email}
                </span>
              </>
            )}
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
            {errors.number && (
              <>
                <span className="err" style={{ color: "red" }}>
                  {errors.number}
                </span>
              </>
            )}
          </div>

          <div className="forErr">
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Your Password"
              required
            />
            {errors.password && (
              <>
                <span className="err" style={{ color: "red" }}>
                  {errors.password}
                </span>
              </>
            )}
          </div>
        </div>

        <div id="loginR">
          Have an account?{" "}
          <button className="btnLogin" onClick={routeChangelogin}>
            Login
          </button>
        </div>
        <div id="btnR">
          <button className="btn1" type="submit">
            Regsiter
          </button>
        </div>
      </form>
    </div>
  );
}
