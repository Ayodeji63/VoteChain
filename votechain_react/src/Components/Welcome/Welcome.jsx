import React from "react";
import "./Welcome.css";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-user-details">
        <h4>Welcome, Lulu Bridget</h4>
        <div className="user-pooling-details">
          <p>
            Polling Unit: <span>Central School, Alor</span>
          </p>
          <p>
            Polling Unit No: <span>026</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
