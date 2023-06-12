import React, { useEffect } from "react";
import "./login.css";

import log4 from "./undraw_data_processing_yrrv.svg";
import tigerImage from "./download (2).png";
import snowflakeImage from "./download (1).png";

import { Helmet } from "react-helmet";

import { signInWithGoogle } from "../../../services/firebase";

const LoginPage = (props) => {
  const loginHandler = () => {
    props.setIsLoggedIn(!props.isLoggedIn);
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/64d58efce2.js";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" class="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="email" placeholder="Email ID" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <div className="forget">
              <label for="">
                <input type="checkbox"></input>
                Remember Me
              </label>
              <a href="#"> Forgot Password</a>
            </div>
            <input
              type="submit"
              value="Login"
              className="btn solid"
              onClick={loginHandler}
            />
            <p className="social-text">Or </p>
            <div>
              <input
                type="submit"
                value="Sign in with Google"
                className="google-signin"
                onClick={signInWithGoogle}
              />
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <div></div>
            <div className="logo">
              <img src={tigerImage} className="tiger-image" alt="Logo" />
              <div className="vertical-line" />
              <img
                src={snowflakeImage}
                className="snowflake-image"
                alt="Logo"
              />
            </div>
            <h2 className="heading2">Snowflake Data Fabric</h2>
          </div>
          <img src={log4} className="image" alt="" />
        </div>
      </div>
      <Helmet>
        <script
          src="https://kit.fontawesome.com/64d58efce2.js"
          crossorigin="anonymous"
        ></script>
      </Helmet>
    </div>
  );
};

export default LoginPage;
