import React from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { Web3Button } from "@web3modal/react"
import App from "../blocto_test/App"

const Login = () => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate("/welcome")
    }
    return (
        <div className="login-container">
            <div className="login-form">
                <h3>Register To Vote </h3>
                <p>
                    Enter your Voters Identification Number (VIN) or National{" "}
                    <br />
                    Identification Number(NIN)
                </p>
                <input type="text" placeholder="Enter your VIN/NIN" />
                <input type="email" placeholder="Enter your Email Address" />
                <button onClick={handleNavigate}>Register</button>
                {/* <span>
                    Don't have an account? <a href="/register">Register</a>
                </span> */}
            </div>
        </div>
    )
}

export default Login
