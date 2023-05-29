import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import "./VoteCategory.css";

const VoteCategory = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/finalresults");
  };
  return (
    <div className="vote-category-container">
      <div className="vote-details">
        <h5>Vote</h5>
        <div className="vote-category-cards">
          <div className="vote-category-card" onClick={handleNavigate}>
            <h5>
              Presidential elections <AiOutlineRight className="vote-icon" />
            </h5>
          </div>
          <div className="vote-category-card">
            <h5>
              Senate election <AiOutlineRight className="vote-icon" />
            </h5>
          </div>
          <div className="vote-category-card">
            <h5>
              House of Representative <AiOutlineRight className="vote-icon" />
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteCategory;
