import React from "react";
import "./CreatePoll.css";
import candidateAvatarUpload from "../../../images/candidate-avatar-upload.png";

const CreatePoll = () => {
  return (
    <div className="create-poll-container">
      <div className="create-poll-form">
        <input type="text" placeholder="Presidential election" />
        <p>Add Candidate</p>
        <div>
          <img src={candidateAvatarUpload} alt="Candidate Upload" />
          <p>Candice Wu</p>
          <p>APC</p>
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;
