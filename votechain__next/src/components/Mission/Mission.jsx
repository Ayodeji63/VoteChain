import React from "react"
import "./Mission.css"
import Image from "next/image"

const Mission = () => {
    return (
        <div className="mission-container" id="mission">
            <div className="mission-details">
                <div className="mission-image">
                    <img
                        src={"/images/mission-image.png"}
                        alt="Mission Illustration"
                    />
                </div>
                <div className="mission-text">
                    <h5>Our mission</h5>
                    <p>
                        Whether you have a team of 2 or 200, our shared team{" "}
                        <br /> inboxes keep everyone on the same page and in the
                        loop.
                    </p>
                    <div className="highlight-missions">
                        <img src={"/images/Check icon.png"} alt="Check Icon" />
                        <p>Leverage automation to move fast</p>
                    </div>
                    <div className="highlight-missions">
                        <img src={"/images/Check icon.png"} alt="Check Icon" />
                        <p>Always give customers a human to chat to</p>
                    </div>
                    <div className="highlight-missions">
                        <img src={"/images/Check icon.png"} alt="Check Icon" />
                        <p>Always give customers a human to chat to</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mission
