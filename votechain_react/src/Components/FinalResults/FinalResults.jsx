import React from "react";
import { Table, Modal } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { useRef, useState } from "react";
import "./FinalResults.css";
import modalIcon from "../../images/modal-icon.png";
import { data } from "./data";

const FinalResults = () => {
  const [modal, contextHolder] = Modal.useModal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [isVoted, setIsVoted] = useState(false);
  const showModal = (record) => {
    setIsModalOpen(true);
    setModalContent([record]);
  };
  const handleSuccess = () => {
    setIsVoted(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1000);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsVoted(false);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: ["name", "candidateImage"],
      key: "name",
      render: (text, record) => (
        <div className="candidate-image">
          <img src={record.candidateImage} alt="First Candidate" />
          <a href="##">{record.name}</a>
        </div>
      ),
    },
    {
      title: "PARTY",
      dataIndex: "party",
      key: "party",
    },
    {
      title: "TOTAL VOTES",
      dataIndex: "totalVotes",
      key: "totalVotes",
    },
    {
      title: "ACTION",
      key: "action",
      render: (text, record) => (
        <div>
          <button className="vote-btn" onClick={() => showModal(record)}>
            {isVoted ? "Voted" : "Vote"}
          </button>
          <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
            {modalContent.map((newModal) => (
              <div className="modal-container">
                <img src={modalIcon} alt="Modal Icon" />
                <h4 className="modal-election-name">
                  {isVoted
                    ? "Your Vote was Successful"
                    : `You are about to Vote for ${newModal.name}`}
                </h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Sodales tempor <br />
                  montes ornare quam cum sociis quisque.
                </p>
                <button className="modal-election-btn" onClick={handleSuccess}>
                  {isVoted ? "Okay, Got it" : "Vote"}
                </button>
              </div>
            ))}
          </Modal>
        </div>
      ),
    },
  ];
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
      <p className="aspirants">21 Aspirants</p>

      <Table columns={columns} dataSource={data} scroll={{
      x: 900,
    }}/>
    </div>
  );
};

export default FinalResults;
