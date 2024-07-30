import React from "react";
import { useNavigate } from "react-router-dom";

export default function FormDetails() {
  let navigate = useNavigate();
  const routeChangereg = () => {
    let path = `./register`;
    navigate(path);
  };
  const routeChangelogin = () => {
    let path = `./login`;
    navigate(path);
  };

  return (
    <div id="kuch">
      <div id="btnForReg">
        <button className="btnStart" type="submit" onClick={routeChangereg}>
          Regsiter
        </button>
      </div>
      <div id="btnForLog">
        <button type="submit" className="btnStart" onClick={routeChangelogin}>
          Login
        </button>
      </div>
    </div>
  );
}
