import React from "react";
import "./Mission.css";
import Image from "next/image";

const Mission = () => {
  return (
    <div className="mission-container" id="mission">
      <div className="mission-details">
        <div className="mission-image">
          <img src={"/images/mission-image.png"} alt="Mission Illustration" />
        </div>
        <div className="mission-text">
          <h5>Our mission</h5>
          <p>
            The goal and the plan of the team is to <br />
            show the power of blockchain and decentralization using <br />
            some tools like the ChainLink Automation we have been able to :
          </p>
          <div className="highlight-missions">
            <img src={"/images/Check icon.png"} alt="Check Icon" />
            <p>Automated Announcement of Winner base on Results</p>
          </div>
          <div className="highlight-missions">
            <img src={"/images/Check icon.png"} alt="Check Icon" />
            <p>Automated counts of Vote for each Candidate</p>
          </div>
          <div className="highlight-missions">
            <img src={"/images/Check icon.png"} alt="Check Icon" />
            <p>
              Allow users and electorate have a free and fair voting process
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
