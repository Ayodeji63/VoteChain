import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { Web3Button } from "@web3modal/react"
import App from "../blocto_test/App"
import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi"
import { VOTE_CHAIN_ABI, VOTE_CHAIN_ADDRESS } from "../../.."

const Login = () => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate("/welcome")
    }
    const { address } = useAccount()

    const [ninNumber, setNinNumber] = useState(0)

    // const { data, isLoading, isSuccess, write } = useContractWrite({
    //     address: VOTE_CHAIN_ADDRESS,
    //     abi: VOTE_CHAIN_ABI,
    //     functionName: "registerVoter",
    // })

    const { config, error } = usePrepareContractWrite({
        address: VOTE_CHAIN_ADDRESS,
        abi: VOTE_CHAIN_ABI,
        functionName: "registerVoter",
    })

    const { write } = useContractWrite(config)

    return (
        <div className="login-container">
            <div className="login-form">
                <h3>Register To Vote </h3>
                <p>
                    Enter your Voters Identification Number (VIN) or National{" "}
                    <br />
                    Identification Number(NIN)
                </p>
                <input
                    type="number"
                    value={ninNumber}
                    onChange={(e) => setNinNumber(e.target.value)}
                    placeholder="Enter your VIN/NIN"
                />
                <input type="email" placeholder="Enter your Email Address" />
                <button onClick={write}>Register</button>
                {/* <span>
                    Don't have an account? <a href="/register">Register</a>
                </span> */}
            </div>
        </div>
    )
}

export default Login
