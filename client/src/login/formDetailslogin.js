import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormDetailslogin() {
  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const validation = (values) => {
    const errors = {};
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

    return errors;
  };

  // console.log(values);
  const handleChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = values;
    console.log("message1");
    setErrors(validation(values));
    console.log("message");
    const res = await fetch("/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    console.log("message2");
    console.log(res);
    const data = await res.json();
    console.log("message3");
    console.log(data.error);

    console.log(res);
    // console.log(res.status);
    if (res.status === 404 || !data) {
      alert(data.error);
      console.log("invalid login");
    } else {
      // alert("valid login");
      // localStorage.setItem("userDataToken", data.result.token);
      navigate("/imglogin", { state: { username: username } });
      setValues({
        ...values,
        username: "",
        password: "",
      });
    }
  };

  let navigate = useNavigate();
  const routeChangereg = () => {
    let path = `../register`;
    navigate(path);
  };

  const resetPassword = () => {
    let path = `../reset-password`;
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

        <div id="forget">
          <button id="forgetbtn" onClick={resetPassword} className="btn1">
            Forget password!?
          </button>
        </div>

        <div id="loginL">
          Don't have an account?{" "}
          <button className="btnLogin" onClick={routeChangereg}>
            Register
          </button>
        </div>
        <div id="btnL">
          <button className="btn1" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
