import React, { useState } from "react";
import HeaderReg from "./register/headerreg";
import BoxReg from "./register/boxreg";
import HeaderimgReg from "./imgreg/headerimgreg";
import Boximgreg from "./imgreg/boximgreg";
import Header from "./start/header";
import Box from "./start/box";
import Boxlogin from "./login/boxlogin";
import Headerlogin from "./login/headerlogin";
import Boximglogin from "./imglogin/boximglogin";
import Headerimglogin from "./imglogin/headerimglogin";
import Boxdash from "./dashboard/boxdash";
import Error from "./error";
import Headerforget from "./forgetPassword/headerforget";
import Boxforget from "./forgetPassword/boxforget";
import Headerreset from "./reset/headerreset";
import Boxreset from "./reset/boxreset";
import Boximg from "./changeimg/boximg";
import Headerimg from "./changeimg/headerimg";
import Navbar from "./dashboard/navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Headercontact from "./contactus/headercontact";
import Boxcontact from "./contactus/boxcontact";
// root routes
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Header />
        <Box />
      </div>
    ),
  },
  {
    path: "*",
    element: (
      <div>
        <Error />
      </div>
    ),
  },
  {
    path: "/register",
    element: (
      <div>
        <HeaderReg />
        <BoxReg />
      </div>
    ),
  },
  {
    path: "/imgreg",
    element: (
      <div>
        <HeaderimgReg />
        <Boximgreg />
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Headerlogin />
        <Boxlogin />
      </div>
    ),
  },
  {
    path: "/imglogin",
    element: (
      <div>
        <Headerimglogin />
        <Boximglogin />
      </div>
    ),
  },
  {
    path: "/dash",
    element: (
      <div class="dashboard">
        <Navbar />
        <Boxdash />
      </div>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <div>
        <Headerforget />
        <Boxforget />
      </div>
    ),
  },
  {
    path: "/contact",
    element: (
      <div>
        <Headercontact />
        <Boxcontact />
      </div>
    ),
  },
  {
    path: "/forgetpassword/:id/:token",
    element: (
      <div>
        <Headerreset />
        <Boxreset />
      </div>
    ),
  },
  {
    path: "/changeimg",
    element: (
      <div>
        <Headerimg />
        <Boximg />
      </div>
    ),
  },
]);

function App() {
  const [projectNameForExecution, setprojectNameForExecution] = useState([
    "a",
    "b",
    "c",
  ]);

  const ddd = "a";

  const [selectedProject, setSelectedProject] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item) => {
    setSelectedProject(item);
    setIsOpen(false);
  };

  return (
    <main>
      {/* <RouterProvider router={router} /> */}
      <div className="">
        <select className="selects" placeholder="Select Projects" value={ddd}>
          <option value="">Select project</option>
          {projectNameForExecution.map((item, id) => (
            <option className="asbb" key={id} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </main>
  );
}

export default App;
