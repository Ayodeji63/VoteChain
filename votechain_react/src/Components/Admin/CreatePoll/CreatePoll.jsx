import React from "react";
import "./CreatePoll.css";
import candidateAvatarUpload from "../../../images/candidate-avatar-upload.png";

const CreatePoll = () => {
  return (
    <div className="create-poll-container">
      <h4>Create New Poll</h4>
      <div className="create-poll-form">
        <form>
          <label htmlFor="president-input"></label>
          <input
            type="text"
            id="president-input"
            className="presidential-input"
          />
        </form>
        <div className="president-details">
          <img src={candidateAvatarUpload} alt="" />
          <h5>Candice WU</h5>
          <p>APC</p>
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;
