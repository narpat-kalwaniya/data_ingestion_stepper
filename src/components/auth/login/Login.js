import React, { useEffect } from "react";
import "../../../styles/main.css";
import firebase, { signInWithGoogle } from "../../../services/firebase";

import loginimage from "./Illustration.svg";
import tigerLogo from "./download (2).png";
import ssoIcon from "./sso-icon.png";

import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    // script.src = "https://kit.fontawesome.com/64d58efce2.js";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigate("/home");
      }
    });
  }, []);

  return (
    <div className={classes.loginContainer}>
      <div className={classes["login-left"]}>
        <img src={loginimage} alt="img" />
        <p className={classes["login-img-text"]}>
          Seamless, all-in-one solution for scalable, integrated data management
          and analytics on Snowflake.
        </p>
      </div>
      <div className={classes["login-right"]}>
        <div className={classes.brand}>
          <img
            className={classes["brand-logo"]}
            src={tigerLogo}
            alt="tigerlogo"
          />
          <h1> Snowflake Data Fabric</h1>
        </div>
        <form action="#" className={classes["login-form"]}>
          <input
            className={classes["email-input"]}
            type="email"
            placeholder="Email ID"
          />
          <input
            className={classes["password-input"]}
            type="password"
            placeholder="Password"
          />
          <div className={classes["forget-password"]}>
            <span>Forget Password?</span>
          </div>
          <input
            type="submit"
            value="Login"
            className={classes["login-button"]}
          />
          <p className={classes["or-text"]}>Or</p>
          <div className={classes["sso-button"]} onClick={signInWithGoogle}>
            <img alt="Google sign-in" src={ssoIcon} />
            <p>Continue With SSO</p>
          </div>
        </form>
        <div className={classes["login-footer"]}>
          <p>
            Don’t have an account? <a href="#">Sign Up Now</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
