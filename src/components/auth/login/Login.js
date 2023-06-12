import React, { useEffect } from "react";
// import "./login.css";
import classes from "./Login.module.css";

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
    <div className={classes.container}>
      <div className={classes["forms-container"]}>
        <div className={classes["signin-signup"]}>
          <form action="#" className={classes["sign-in-form"]}>
            <h2 className={classes.title}>Sign in</h2>
            <div className={classes["input-field"]}>
              <i className={`${classes.fas} ${classes["fa-user"]}`}></i>
              <input type="email" placeholder="Email ID" />
            </div>
            <div className={classes["input-field"]}>
              <i className={`${classes.fas} ${classes["fa-lock"]}`}></i>
              <input type="password" placeholder="Password" />
            </div>
            <div className={classes.forget}>
              <label for="">
                <input type="checkbox"></input>
                Remember Me
              </label>
              <a href="#"> Forgot Password</a>
            </div>
            <input
              type="submit"
              value="Login"
              // className="btn solid"
              className={`${classes.btn} ${classes.solid}`}
              onClick={loginHandler}
            />
            <p className={classes["social-text"]}>Or </p>
            <div>
              <input
                type="submit"
                value="Sign in with Google"
                className={classes["google-signin"]}
                onClick={signInWithGoogle}
              />
            </div>
          </form>
        </div>
      </div>

      <div className={classes["panels-container"]}>
        <div className={`${classes.panel} ${classes["left-panel"]}`}>
          <div className={classes.content}>
            <div></div>
            <div className={classes.logo}>
              <img
                src={tigerImage}
                className={classes["tiger-image"]}
                alt="Logo"
              />
              <div className={classes["vertical-line"]} />
              <img
                src={snowflakeImage}
                className={classes["snowflake-image"]}
                alt="Logo"
              />
            </div>
            <h2 className={classes["heading2"]}>Snowflake Data Fabric</h2>
          </div>
          <img src={log4} className={classes.image} alt="" />
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
