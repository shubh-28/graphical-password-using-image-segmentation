import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormDetailslogin() {
  let navigate = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("userDataToken");
    // console.log("Token: ", token);
    const res = await fetch("/api/validuser", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    });
    // // console.log("this is " + token + "dashboard vaslid");
    const data = await res.json();
    if (data.status === 401 || !data) {
      navigate("../*");
    } else {
      // console.log("user verify");
      navigate("/dash");
    }
  };

  useEffect(() => {
    DashboardValid();
  }, []);

  return <div></div>;
}
