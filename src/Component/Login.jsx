import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { loginAction } from "../ActionCreater/LoginActionCreater";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => {
    return state.userDetails.token;
  });

  useEffect(() => {
    if (token) {
      navigate("/typing");
    }
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePass = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = () => {
    const user = {
      email,
      password,
    };
    return fetch("https://chabbi-sever.onrender.com/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.token));
        localStorage.setItem("user", JSON.stringify(res.data));

        const dataToSend = {
          auth: res.data,
          token: res.token,
        };

        loginAction(dataToSend, dispatch);
        setEmail("");
        setPassword("");
        if (res.status === "Successfully logged in") {
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
            navigate("/typing");
          }, 1500);
        } else {
          toast.error("Invalid Credentials", {
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

export default Login;
