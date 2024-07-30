import React from "react";
import { dashData } from "./dashData";

export default function FormHeadingdash() {
  return (
    <div className="dashcontainer">
      {dashData.map((data, index) => (
        <div key={index} className="card">
          <img
            src={data.img}
            id="dashimage"
            alt="Avatar"
            style={{ width: "100%" }}
          />
          <div className="container">
            <h4>
              <b>{data.name}</b>
            </h4>
            <p>{data.price}</p>
          </div>
          <div id="btnR">
            <button className="btn1" type="submit">
              More Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
