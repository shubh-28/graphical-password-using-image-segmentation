import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export default function FormDetailsimg() {
  const [val, setval] = useState({
    username: "",
    password: "",
  });
  const [img, setimg] = useState("");
  let navigate = useNavigate();

  const handleChange = (e) => {
    setval((val) => ({ ...val, [e.target.name]: e.target.value }));
  };

  const handleChangeFile = (e) => {
    console.log("size in bytes: ", e.target.files[0].size);
    let size = e.target.files[0].size;
    size = size / 1024;
    // console.log("size in kb: ", size);
    size = size / 1024;
    console.log("size in mb: ", size);

    if (size >= 2.5) {
      setimg("");
      alert("File too Big, please select a file less than 2.5mb");
    } else {
      // console.log("img: ", e.target.files[0]);
      setimg(e.target.files[0]);
    }
  };

  const routetodash = () => {
    navigate("/dash");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (img == "") {
      console.log("add an image or reduce image size!!");
      alert("add an image or reduce image size!!");
    } else {
      const formData = new FormData();
      formData.append("image", img);
      formData.append("password", val.password);
      formData.append("username", val.username);

      const res = await fetch("/api/changeimg", {
        method: "post",
        // headers: { "content-type": "application/JSON" },
        body: formData,
      });
      const data = await res.json();
      if (res.status === 404 || !data) {
        console.log("invalid Username or Password");
        alert("invalid Username or Password");
      } else {
        alert("Your image password has been successfully changed!!");
        navigate(`../dash`);
      }
    }
  };

  return (
    <section>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicFile">
            <Form.Control
              type="text"
              name="username"
              value={val.username}
              onChange={handleChange}
              placeholder="Your UserName"
              required
            />
            <Form.Control
              type="password"
              name="password"
              value={val.password}
              onChange={handleChange}
              placeholder="Your Password"
              required
            />
            <Form.Control
              type="file"
              placeholder="image"
              onChange={handleChangeFile}
              accept="image/*"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        <Button onClick={routetodash}>Go Back</Button>
      </div>
    </section>
  );
}
