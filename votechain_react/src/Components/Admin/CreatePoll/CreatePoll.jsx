import React from "react";
import "./CreatePoll.css";
import { AiOutlinePlus } from "react-icons/ai";
import candidateAvatarUpload from "../../../images/candidate-avatar-upload.png";

const CreatePoll = () => {
  return (
    <div className="create-poll-container">
      <h4>Create New Poll</h4>
      <div className="create-poll-form">
        <form className="president-form">
          <label htmlFor="president-input">Name of poll</label>
          <input
            type="text"
            id="president-input"
            className="presidential-input"
          />
        </form>
        <h5>Add Candidate</h5>
        <div className="president-details">
          <img src={candidateAvatarUpload} alt="" />
          <h5>Candice WU</h5>
          <p>APC</p>
        </div>
        <div className="add-new-candidate">
          <AiOutlinePlus className="add-icon" />
          <p>Add new candidate</p>
        </div>
        <div className="create-buttons">
          <button className="cancel-btn">Cancel</button>
          <button className="create-btn">Create poll</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;
