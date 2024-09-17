import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

export default function FormDetailslogin() {
  let num = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let array = [];
  let navigate = useNavigate();
  const location = useLocation();
  const username = location.state.username;
  const [dataa, setdata] = useState([
    {
      data: "",
      numss: -1,
    },
  ]);
  const [spin, setspin] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setspin(false);
    }, 2000);
  });

  const showimg = async () => {
    const res = await fetch("/api/getuser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username: location.state.username }),
    });
    const data = await res.json();
    // console.log("data: ", data);
    if (data.status ==== 401 || !data) {
      // navigate("../*");
      // console.log("error in showing img");
    } else {
      // console.log("showing img");
      // console.log("data: ", data.data.imgsegment);

      // let ar = [];
      // ar.push(
      //   data.data.imgsegment.map((i) => {
      //     return i.imgg;
      //   })
      // );
      // // console.log("ar: ", ar);
      // const set1 = async (data) => {
      //   // console.log("yha are");
      //   setdata({ dataaa: ar[0] });
      // };
      // set1(data);
      for (let i = 0; i < 9; i++) {
        let arr = [
          {
            data: data.data.imgsegment[i].imgg,
            numss: data.data.imgsegment[i].num,
          },
        ];
        if (i ==== 0) {
          setdata((current) => [...arr]);
        } else {
          setdata((current) => [...current, ...arr]);
        }
      }
    }
  };

  useEffect(() => {
    showimg();
  }, []);

  useEffect(() => {
    // console.log("length ", dataa.length);
    // // console.log("length ", num.length);
  }, [dataa]);

  const routeChangereg = () => {
    let path = `../login`;
    navigate(path);
  };

  const resetPassword = () => {
    let path = `../reset-password`;
    navigate(path);
  };

  const handlephoto = (event) => {
    let id = event.currentTarget.className;
    array.push(id);
    let p = document.getElementById(id);
    // console.log(array);
    // console.log("key, ", p);
    if (array.length ==== 2) {
      let a = document.getElementById(array[0]);
      let b = document.getElementById(array[1]);
      // console.log("a ", a.name);
      // console.log("b ", b.className);
      let temp = a.src;
      a.src = b.src;
      b.src = temp;
      let temp2 = a.name;
      a.name = b.name;
      b.name = temp2;
      array.length = 0;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let a = document.getElementById("image0");
    let b = document.getElementById("image1");
    let c = document.getElementById("image2");
    let d = document.getElementById("image3");
    let e = document.getElementById("image4");
    let f = document.getElementById("image5");
    let g = document.getElementById("image6");
    let h = document.getElementById("image7");
    let i = document.getElementById("image8");

    if (
      a.name === a.className &&
      b.name === b.className &&
      c.name === c.className &&
      d.name === d.className &&
      e.name === e.className &&
      f.name === f.className &&
      g.name === g.className &&
      h.name === h.className &&
      i.name === i.className
    ) {
      // // console.log("bade shi jare");

      //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

      const res = await fetch("/api/imglogin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
        }),
      });
      //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      // console.log("message2");
      // console.log(res);
      const data = await res.json();
      // console.log("message3");
      // console.log(data.error);

      // console.log(res);
      // // console.log(res.status);
      if (res.status ==== 404 || !data) {
        alert(data.error);
        // console.log("invalid login");
      } else {
        // alert("valid login");
        localStorage.setItem("userDataToken", data.result.token);
        navigate("/dash");
      }

      //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

      alert("Valid Login, welcome to our Car's Market");
    } else {
      alert("password is incorrect!!");
    }
    // const username = location.state.username;
    // // console.log("message1");
    // setErrors(validation(values));
    // console.log("message");
  };

  // console.log("nnnn: ", dataa);
  // // console.log("nnn1n: ", numos);
  return (
    <div style={{ marginBottom: "8rem" }}>
      {spin ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "90vh", fontSize: "2.5rem" }}
        >
          <Spinner animation="border" variant="danger" />
          &nbsp;&nbsp; Loading...
        </div>
      ) : (
        <div>
          <div className="photodiv">
            {/* {dataa.map((i, a) => {
          arr[a] = dataa[a];
        })} */}
            {dataa.map((i, a) => {
              let n = dataa.length;
              let j = Math.floor(Math.random() * n);
              let temp = dataa[j]; // Swap arr[i] and arr[j]
              dataa[j] = dataa[a];
              dataa[a] = temp;
            })}
            {dataa.map((i, a) => {
              // console.log("a ", a);
              return (
                <button
                  className={`image${a}`}
                  onClick={handlephoto}
                  key={a}
                  style={{
                    border: "none",
                    padding: "0px",
                  }}
                >
                  <img
                    className={num[a]}
                    id={`image${a}`}
                    key={a}
                    src={dataa[a].data}
                    name={dataa[a].numss}
                    style={{
                      margin: "0.7rem",
                      width: "12rem",
                      height: "12rem",
                    }}
                  />
                </button>
              );
            })}
          </div>
          <form className="reg" method="post" onSubmit={handleSubmit}>
            <div id="btnL" style={{ marginTop: "1.8rem" }}>
              <button className="btn1" type="submit">
                Login
              </button>
            </div>

            <div id="loginL" style={{ marginTop: "3.8rem" }}>
              <button className="btnLogin" onClick={routeChangereg}>
                Go Back
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
