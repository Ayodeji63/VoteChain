import React from "react";
import "./Welcome.css";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-user-details">
        <h4>Welcome, Lulu Bridget</h4>
        <div className="user-pooling-details">
          <p>
            <strong>Polling Unit:</strong> <span>Central School, Alor</span>
          </p>
          <p>
            <strong>Polling Unit No:</strong> <span>026</span>
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
              Enter your Voters Identification Number (VIN) or National <br />{" "}
              Identification Number (NIN)
            </span>
          </div>
          <div className="election-time">
            <p>Time remaining</p>
            <h5>4Hrs: 15mins: 20secs</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
