import React from 'react'
import "./Login.css"

const Login = () => {
  return (
    <div className='login-container'>
        <div className='login-form'>
            <h3>Log in to your account </h3>
            <p>Enter your Voters Identification Number (VIN) or National <br/>Identification Number(NIN)</p>
            <input type="text" placeholder="Enter your VIN/NIN"/>
            <input type="password" placeholder="Enter your Password"/>
            <button>Login</button>
            <p>Don't have an account? </p><a href="/register">Register</a>
        </div>
    </div>
  )
}

export default Login