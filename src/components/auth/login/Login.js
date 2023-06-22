import React, { useEffect } from "react";
import "../../../styles/main.css";

import { signInWithGoogle } from "../../../services/firebase";
import "./login.css";

import loginimage from "./Illustration.svg";
import tigerLogo from "./download (2).png";
import ssoIcon from "./sso-icon.png";

const LoginPage = (props) => {
  // const loginHandler = () => {
  //   props.setIsLoggedIn(!props.isLoggedIn);
  // };
  useEffect(() => {
    const script = document.createElement("script");
    // script.src = "https://kit.fontawesome.com/64d58efce2.js";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return (
    <div className="loginContainer">
      <div className="login-left">
        <img src={loginimage} alt="img" />
        <p className="login-img-text">
          Seamless, all-in-one solution for scalable, integrated data management
          and analytics on Snowflake.
        </p>
      </div>
      <div className="login-right">
        <div className="brand">
          <img className="brand-logo" src={tigerLogo} alt="tigerlogo" />
          <h1> Snowflake data fabric</h1>
        </div>
        <form action="#" className="login-form">
          <input className="email-input" type="email" placeholder="Email ID" />
          <input
            className="password-input"
            type="password"
            placeholder="Password"
          />
          <div className="forget-password">
            <span>Forget password?</span>
          </div>
          <input type="submit" value="Login" className="login-button" />
          <p className="or-text">Or</p>
          <div className="sso-button" onClick={signInWithGoogle}>
            <img alt="Google sign-in" src={ssoIcon} />
            <p>Continue with SSO</p>
          </div>
        </form>
        <div className="login-footer">
          <p>
            Don’t have an account? <a href="#">Sign Up now</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
