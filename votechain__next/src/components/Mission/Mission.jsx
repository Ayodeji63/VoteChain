import React from "react"
import "./Mission.css"
import Image from "next/image"

const Mission = () => {
    return (
        <div className="mission-container" id="mission">
            <div className="mission-details">
                <div className="mission-image">
                    <Image
                        src={"/images/mission-image.png"}
                        alt="Mission Illustration"
                        width={100}
                        height={100}
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
                        <Image
                            src={"/images/Check icon.png"}
                            alt="Check Icon"
                            width={100}
                            height={100}
                        />
                        <p>Leverage automation to move fast</p>
                    </div>
                    <div className="highlight-missions">
                        <Image
                            src={"/images/Check icon.png"}
                            alt="Check Icon"
                            width={100}
                            height={100}
                        />
                        <p>Always give customers a human to chat to</p>
                    </div>
                    <div className="highlight-missions">
                        <Image
                            src={"/images/Check icon.png"}
                            alt="Check Icon"
                            width={100}
                            height={100}
                        />
                        <p>Always give customers a human to chat to</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mission
