import React from "react";
import "./LiveResults.css";
import { AiOutlineArrowUp } from "react-icons/ai";

const LiveResults = () => {
  return (
    <div className="live-result-container">
      <div className="live-result-details">
        <h5>Live Results</h5>
        <div className="live-results-cards">
          <div className="live-results-card">
            <h5 className="live-result-type">Presidential elections</h5>
            <span>Counted Votes</span>
            <h5>12,420,567</h5>
            <p>
              <span>
                <AiOutlineArrowUp /> 60%{" "}
              </span>
              Labour Party
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveResults;
