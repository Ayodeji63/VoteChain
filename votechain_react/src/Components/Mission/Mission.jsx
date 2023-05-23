import React from "react";
import "./Mission.css";
import missionImage from "../../images/mission-image.png";
import checkIcon from "../../images/Check icon.png";

const Mission = () => {
  return (
    <div className="mission-container">
      <div className="mission-details">
        <div className="mission-image">
          <img src={missionImage} alt="Mission Illustration" />
        </div>
        <div className="mission-text">
          <h5>Our mission</h5>
          <p>
            Whether you have a team of 2 or 200, our shared team <br /> inboxes
            keep everyone on the same page and in the loop.
          </p>
          <div className="highlight-missions">
            <img src={checkIcon} alt="Check Icon" />
            <p>Leverage automation to move fast</p>
          </div>
          <div className="highlight-missions">
            <img src={checkIcon} alt="Check Icon" />
            <p>Always give customers a human to chat to</p>
          </div>
          <div className="highlight-missions">
            <img src={checkIcon} alt="Check Icon" />
            <p>Always give customers a human to chat to</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
