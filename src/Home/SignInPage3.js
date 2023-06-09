import React from "react";
import "./SignInPage3.css";

const SignInPage3 = () => {
  return (
    <div>
      <section>
        <div className="form-box">
          <div className="form-value">
            <form action="">
              <h2>Login</h2>
              <div className="inputbox">
                <input type="email"></input>
                <label for="">Email</label>
              </div>
              <div className="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input type="password"></input>
                <label for="">Password</label>
              </div>
              <div className="forget">
                <label for="">
                  <input type="checkbox"></input>
                  Remember Me
                  <a href="#"> Forget Password</a>
                </label>
              </div>
              <button>Log in</button>
              <div className="register">
                <p>
                  Don't have a account<a href="#">Register</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
      <script
        type="module"
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        nomodule
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
      ></script>
    </div>
  );
};

export default SignInPage3;
