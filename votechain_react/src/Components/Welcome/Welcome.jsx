import React from "react"
import "./Welcome.css"
import { useAccount } from "wagmi"
import { useNavigate } from "react-router-dom"
const Welcome = () => {
    const { address } = useAccount()
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate("/login")
    }
    return (
        <div className="welcome-container">
            <div className="welcome-user-details">
                <h4>
                    Welcome, <span>{address}</span>
                </h4>
                <div className="user-pooling-details">
                    {/* <p>
                        <strong>Polling Unit:</strong>{" "}
                        <span>Central School, Alor</span>
                    </p>
                    <p>
                        <strong>Polling Unit No:</strong> <span>026</span>
                    </p> */}
                    <p>
                        <strong>
                            Register To Vote:{" "}
                            <span className="register-text"
                               
                                onClick={handleNavigate}
                            >
                                click here
                            </span>{" "}
                        </strong>
                    </p>
                </div>
            </div>
            <div className="election-container">
                <div className="election-details">
                    <div className="election-text">
                        <h4>
                            Presidential, Senate And House of
                            <br />
                            Representative Election
                        </h4>
                        <span>
                            Enter your Voters Identification Number (VIN) or
                            National <br /> Identification Number (NIN)
                        </span>
                    </div>
                    <div className="election-time">
                        <p>Time remaining</p>
                        <h5>4Hrs: 15mins: 20secs</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome
