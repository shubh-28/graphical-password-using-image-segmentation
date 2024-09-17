import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  let navigate = useNavigate();

  const goError = () => {
    navigate("*");
  };

  const logoutuser = async () => {
    let token = localStorage.getItem("userDataToken");
    // // console.log("naya vaala " + token);

    const res = await fetch("/api/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
      credentials: "include",
    });

    // // console.log("loggout out user" + token);
    const data = await res.json();
    // console.log(data);

    if (data.status === 201) {
      // console.log("user logout");
      localStorage.removeItem("userDataToken");
      navigate("/");
    } else {
      // console.log("error");
    }
  };

  const routeChangecontact = () => {
    let path = `../contact`;
    navigate(path);
  };

  const routechangeimage = () => {
    let path = `../changeimg`;
    navigate(path);
  };

  return (
    <div className="nav">
      <button onClick={logoutuser} class="logoutnav" type="submit">
        Log Out
      </button>
      <button class="logoutnav" onClick={routeChangecontact} type="submit">
        Contact Us
      </button>
      <button
        // class="logoutnav"
        id="gotoimgchange"
        onClick={routechangeimage}
        type="submit"
      >
        Change Image
      </button>
    </div>
  );
};

export default Navbar;
