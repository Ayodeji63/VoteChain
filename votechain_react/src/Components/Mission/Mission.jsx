import React from "react";
import "./Mission.css";
import missionImage from "../../images/mission-image.png";

const Mission = () => {
  return (
    <div className="mission-container">
      <div className="mission-details">
        <div className="mission-image">
          <img src={missionImage} alt="Mission Illustration" />
        </div>
        <div className="mission-text">
            <h5>Our mission</h5>
            <p>Whether you have a team of 2 or 200, our shared team <br/> inboxes keep everyone on the same page and in the loop.</p>
            <div>
                
            </div>

        </div>
      </div>
    </div>
  );
};

export default Mission;
