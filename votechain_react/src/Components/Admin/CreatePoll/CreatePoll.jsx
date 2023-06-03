import React, { useState } from "react";
import "./CreatePoll.css";
import { AiOutlineInbox } from "react-icons/ai";
import { Modal, Upload, message } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import candidateAvatarUpload from "../../../images/candidate-avatar-upload.png";

const CreatePoll = () => {
  const { Dragger } = Upload;
  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onchange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file uploaded failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
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
              <Dragger {...props} className="dragger-upload">
                <p className="ant-upload-drag-icon">
                  <AiOutlineInbox className="candidate-upload-icon" />
                </p>
                <p className="ant-upload-text">Upload Candidate Photo</p>
                <p className="ant-upload-hint">
                  <span className="colored">Click to Upload</span> or drag and
                  drop
                </p>
              </Dragger>
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
