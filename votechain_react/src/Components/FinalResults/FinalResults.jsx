import React from "react";
import { Table, Modal } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import "./FinalResults.css";
import { data } from "./data";

const FinalResults = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
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
      render: () => <button className="vote-btn">Vote</button>,
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
