import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./FinalResults.css";

const FinalResults = () => {
  return (
    <div className="final-results-container">
      <div className="final-results-text-search">
        <h4>Presidential Election 2023</h4>
        <div className="search-input">
          <AiOutlineSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search For Doctors"
            className="search-input-tag"
          />
        </div>
      </div>
    </div>
  );
};

export default FinalResults;