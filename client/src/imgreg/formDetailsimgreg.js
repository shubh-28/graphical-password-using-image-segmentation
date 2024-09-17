import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useLocation } from "react-router-dom";

const FormDetailsimgreg = () => {
  let navigate = useNavigate();
  const location = useLocation();

  const [img, setimg] = useState("");
  // // console.log(img, 12);
  // // console.log("username: ", location.state.username);

  const handleChange = (e) => {
    // console.log("size in bytes: ", e.target.files[0].size);
    let size = e.target.files[0].size;
    size = size / 1024;
    // console.log("size in kb: ", size);
    size = size / 1024;
    // console.log("size in mb: ", size);

    if (size >= 2.5) {
      setimg("");
      alert("File too Big, please select a file less than 2.5mb");
    } else {
      setimg(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (img === "") {
      // console.log("add an image or reduce image size!!");
      alert("add an image or reduce image size!!");
    } else {
      // console.log("go ahead");
      // console.log("imageeeee: ", img);
      const formData = new FormData();
      formData.append("image", img);
      formData.append("username", location.state.username);
      const res = await fetch("/api/imgreg", {
        method: "post",
        // headers: { "content-type": "application/JSON" },
        body: formData,
      });
      const data = await res.json();
      if (res.status ==== 404 || !data) {
        // console.log("invalid reg");
      } else {
        alert("You are registered successfully, Now login!!");
        navigate(`../login`);
      }
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicFile">
          <Form.Control
            type="file"
            placeholder="image"
            onChange={handleChange}
            accept="image/*"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default FormDetailsimgreg;
