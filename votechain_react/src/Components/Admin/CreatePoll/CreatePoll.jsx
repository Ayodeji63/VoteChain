import React, { useState } from "react";
import "./CreatePoll.css";
import { Modal } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import candidateAvatarUpload from "../../../images/candidate-avatar-upload.png";

const CreatePoll = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
        <div className="add-new-candidate" onClick={showModal}>
          <AiOutlinePlus className="add-icon" />
          <p>Add new candidate</p>
        </div>
        <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
          <div>
            <h4>Enter candidate details</h4>
            <form className="form-upload">
              <label htmlFor="CandidateName">Name of Candidate</label>
              <input
                type="text"
                placeholder="Candidate Name"
                id="CandidateName"
              />
              <label htmlFor="PartyName">Name of Party</label>
              <input type="text" placeholder="Party Name" id="PartyName" />
            </form>
          </div>
        </Modal>

        <div className="create-buttons">
          <button className="cancel-btn">Cancel</button>
          <button className="create-btn">Create poll</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;
