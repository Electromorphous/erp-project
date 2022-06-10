import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "../../sass/style.scss";

import ApiUrl from "../../services/Api";
import llogo from "../../images/llogo.png";
import logo2 from "../../images/logo2.png";

function Login1() {
  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      // document.getElementById('a').style.visibility = hidden;
      container.classList.add("right-panel-active");
    });
    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
  }, []);

  const [state, setState] = useState({
    username: null,
    password: null,
    login: false,
    token: null,
    Studentlogin: false,
    studenttoken: null,
    userId: "",
  });
  function toggle() {
    var show = document.getElementById("Show");
    if (show.type == "password") {
      show.type = "text";
      document.getElementById("font").style.color = "black";
    } else {
      show.type = "password";
      document.getElementById("font").style.color = "grey";
    }
  }
  function toggles() {
    var show = document.getElementById("password");
    if (show.type == "password") {
      show.type = "text";
      document.getElementById("fonts").style.color = "black";
    } else {
      show.type = "password";
      document.getElementById("fonts").style.color = "grey";
    }
  }
  function handleusername(e) {
    setState({ ...state, username: e.target.value });
  }
  function handlepassword(e) {
    setState({ ...state, password: e.target.value });
  }

  function authenticateStudent() {
    alert("Still api is not created");
    fetch("", {
      method: "POST",
      headers: {
        "Contect-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(state),
    }).then((response) => {
      response.json().then((result) => {
        if (
          state.username === result.userName &&
          state.password === result.userName
        ) {
          localStorage.setItem(
            "studentauthenticate",
            JSON.stringify({
              Studentlogin: true,
              username1: result.userName,
              token: result.token,
              userId: result.userId,
            })
          );
          setState({
            Studentlogin: true,
          });
        } else {
          alert("unauthorized");
          setState({ Studentlogin: false });
        }
      });
    });
  }
  function authenticateErp(e) {
    e.preventDefault();

    fetch(`${ApiUrl}/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(state),
    })
      .then((response) => {
        console.log(response);
        response.json().then((result) => {
          if (
            state.username === result.userName &&
            state.password === result.userName
          ) {
            localStorage.setItem(
              "authenticate",
              JSON.stringify({
                login: true,
                username1: result.userName,
                token: result.token,
                userId: result.userId,
              })
            );
            setState({
              login: true,
            });
          } else {
            alert("Invalid Username Or Password");
            setState({ login: false });
          }
        });
      })
      .catch((err) => {
        alert("Error");
      });
  }

  return (
    <>
      <div className="container" id="container">
        <div className="form-container sign-up-container" id="a">
          <form action="">
            <h1 id="lbl">Student</h1>
            <label className="label-form">Username</label>
            <input
              type="text"
              placeholder="Enter AUID"
              onChange={handleusername}
            />
            <label className="label-form">Password</label>
            <VisibilityIcon
              className="i"
              onClick={toggles}
              id="fonts"
            ></VisibilityIcon>
            <input
              type="password"
              placeholder="Enter Your Password"
              id="password"
              onChange={handlepassword}
            />

            <button onClick={authenticateStudent} type="submit">
              Sign In to Continue
            </button>

            <a href="" className="password">
              <span>Forgot Password?</span>
            </a>
          </form>
        </div>
        <div className="form-container sign-in-container" id="b">
          <form action="">
            <h1 id="lblq">Staff</h1>
            <label className="label-form">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              onChange={handleusername}
            />
            <label className="label-form">Password</label>
            <VisibilityIcon
              className="ii"
              onClick={toggle}
              id="fonts"
            ></VisibilityIcon>
            <input
              type="password"
              placeholder="Enter Your Password"
              id="Show"
              onChange={handlepassword}
            />

            <button onClick={authenticateErp} type="submit" value="Submit">
              Sign In to Continue
            </button>

            <a href="" className="password">
              <span>Forgot Password?</span>
            </a>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <img src={llogo} alt="" width="100px" />
              <div className="paragraph">
                <img src={logo2} alt="" width="180px" />
              </div>

              <button className="press" id="signIn">
                Staff Login
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <img src={llogo} alt="" width="100px" />
              <div className="paragraph">
                <img src={logo2} alt="" width="180px" />
              </div>

              <button className="press" id="signUp">
                Student Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login1;
