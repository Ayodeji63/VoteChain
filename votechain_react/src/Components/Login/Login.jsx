import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h3>Log in to your account </h3>
        <p>
          Enter your Voters Identification Number (VIN) or National <br />
          Identification Number(NIN)
        </p>
        <input type="text" placeholder="Enter your VIN/NIN" />
        <input type="email" placeholder="Enter your Email Address" />
        <button>Login</button>
        <span>
          Don't have an account? <a href="/register">Register</a>
        </span>
      </div>
    </div>
  );
};

export default Login;
