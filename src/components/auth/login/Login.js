import React, { useEffect } from "react";
// import "./login.css";
import classes from "./Login.module.css";
import "../../../styles/main.css";

import log4 from "./undraw_data_processing_yrrv.svg";
import tigerImage from "./download (2).png";
import snowflakeImage from "./download (1).png";
import googleLogo from "./google-logo.png";

import { Helmet } from "react-helmet";

import { signInWithGoogle } from "../../../services/firebase";
import { Button } from "react-bootstrap";

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
    <div className={classes.container}>
      <div className={classes["forms-container"]}>
        <div className={classes["signin-signup"]}>
          <form action="#" className={classes["sign-in-form"]}>
            <h2 className={classes.title}>Sign in</h2>
            <div className={classes["input-field"]}>
              <i className="fas fa-user"></i>
              <input type="email" placeholder="Email ID" />
            </div>
            <div className={classes["input-field"]}>
              <i className="fas fa-lock"></i>
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
              className="btn-s-1"
            />
            <p className={classes["social-text"]}>Or </p>
            <div
              className="btn-s-1"
              style={{
                width: "250px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "white",
              }}
              onClick={signInWithGoogle}
            >
              <img
                style={{
                  flexShrink: "0",
                  width: "30px",
                  height: "30px",
                  // padding: "10px",
                  // backgroundColor: "white",
                  // borderRadius: "50%",
                }}
                alt="Google sign-in"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              />
              <p>Continue with Google</p>
              {/* <input
                type="submit"
                value="Sign in with Google"
                className="btn-s-1"
                onClick={signInWithGoogle}
              /> */}
            </div>
          </form>
        </div>
      </div>

      <div className={classes["panels-container"]}>
        <div className={`${classes.panel} ${classes["left-panel"]}`}>
          <div className={classes.content}>
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
            <h2 className={classes.heading2}>Snowflake Data Fabric</h2>
          </div>
          <img src={log4} className={classes.image} alt="" />
        </div>
      </div>
      <Helmet>
        <script
          // src="https://kit.fontawesome.com/64d58efce2.js"
          crossorigin="anonymous"
        ></script>
      </Helmet>
    </div>
  );
};

export default LoginPage;
