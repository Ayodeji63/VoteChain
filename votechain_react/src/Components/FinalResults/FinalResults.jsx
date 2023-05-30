import React from "react";
import { Table, Modal } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import "./FinalResults.css";
import { data } from "./data";

const FinalResults = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const showModal = (record) => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
            Vote
          </button>
          <Modal open={isModalOpen} onCancel={handleCancel}>
            {}
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

      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default FinalResults;
