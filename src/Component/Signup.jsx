import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePass = (e) => {
    setPassword(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleClick = () => {
    const data = {
      name,
      email,
      password,
    };

    fetch("https://chabbi-sever.onrender.com/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.response === "Success") {
          toast.success(res.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }else{
          // console.log(res)
          toast.error(res.error, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        setEmail("");
        setPassword("");
        setName("");
      })
      .catch((err) => {
        console.log(err)
      })
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="containerLogin">
        <p className="para1">Name: </p>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleName}
          className="email"
        />
        <p className="para1">Email: </p>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleEmail}
          className="email"
        />
        <p className="para2">Password: </p>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePass}
          className="password"
        />
        <button className="LoginBtn" onClick={handleClick}>
          Submit
        </button>
        Don't have an account?
        <Link to="/signup" className="navigateToSignUp">
          {" "}
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Signup;
