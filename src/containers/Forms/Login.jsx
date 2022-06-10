import React, { Component } from "react";
import { Link } from "react-router-dom";
// import AI from "../img/AI.png";
import "../../sass/style.scss";

import ApiUrl from "../../services/Api";
import llogo from "../../images/llogo.png";
import logo2 from "../../images/logo2.png";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../containers/Forms/Header";

class login extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      login: false,
      token: null,
      Studentlogin: false,
      studenttoken: null,
      userId: "",
    };
  }

  toggle = () => {
    var show = document.getElementById("Show");
    if (show.type == "password") {
      show.type = "text";
      document.getElementById("font").style.color = "black";
    } else {
      show.type = "password";
      document.getElementById("font").style.color = "grey";
    }
  };
  toggles = () => {
    var show = document.getElementById("password");
    if (show.type == "password") {
      show.type = "text";
      document.getElementById("fonts").style.color = "black";
    } else {
      show.type = "password";
      document.getElementById("fonts").style.color = "grey";
    }
  };

  componentDidMount() {
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
  }

  authenticateStudent() {
    alert("Still api is not created");
    fetch("", {
      method: "POST",
      headers: {
        "Contect-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(this.state),
    }).then((response) => {
      response.json().then((result) => {
        if (
          this.state.username === result.userName &&
          this.state.password === result.userName
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
          this.setState({
            Studentlogin: true,
          });
        } else {
          alert("unauthorized");
          this.setState({ Studentlogin: false });
        }
      });
    });
  }

  authenticateErp(e) {
    e.preventDefault();

    fetch(`${ApiUrl}/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => {
        response.json().then((result) => {
          if (
            this.state.username === result.userName &&
            this.state.password === result.userName
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
            this.setState({
              login: true,
            });
          } else {
            alert("Invalid Username Or Password");
            this.setState({ login: false });
          }
        });
      })
      .catch((err) => {
        alert("Error");
      });
  }

  render() {
    if (this.state.login === true) {
      // return <Redirect to="/Head" />;
      return (window.location.href = "/Header");
    }
    return (
      <div>
        <div className="container" id="container">
          <div className="form-container sign-up-container" id="a">
            <form action="">
              <h1 id="lbl">STUDENT</h1>
              <label className="label-form">Username</label>
              <input
                type="text"
                placeholder="Enter AUID"
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                }}
              />
              <label className="label-form">Password</label>
              <i
                class="fa-solid fa-eye"
                id="fonts"
                onClick={this.toggles}
                aria-hidden="true"
              ></i>
              <input
                type="password"
                placeholder="Enter Your Password"
                id="password"
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
              />

              <button
                onClick={() => {
                  this.authenticateStudent();
                }}
                type="submit"
                value="Submit"
              >
                Sign In to Continue
              </button>
              <Link to="/ForgotPassword">Forgot Password ?</Link>
              {/* <a href="" class="password">
                <span>Forgot Password?</span>
              </a> */}
            </form>
          </div>
          <div className="form-container sign-in-container" id="b">
            <form action="">
              <h1 id="lblq">STAFF</h1>
              <label className="label-form">Username</label>
              <input
                type="text"
                placeholder="Enter Username"
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                }}
              />
              <label className="label-form">Password</label>{" "}
              <i
                class="fa-solid fa-eye"
                id="fonts"
                onClick={this.toggle}
                aria-hidden="true"
              ></i>
              <input
                type="password"
                placeholder="Enter Your Password"
                id="Show"
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
              />
              <button
                onClick={(e) => {
                  this.authenticateErp(e);
                }}
                type="submit"
                value="Submit"
              >
                Sign In to Continue
              </button>
              <Link to="/ForgotPassword">Forgot Password ?</Link>
              {/* <a href="" className="password">
                <span>Forgot Password?</span>
              </a> */}
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <img src={llogo} alt="" style={{ width: "100px" }} />
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
      </div>
    );
  }
}

export default login;
