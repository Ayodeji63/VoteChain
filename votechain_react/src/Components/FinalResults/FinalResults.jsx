import React from "react";
import { Table } from "antd";
import firstCandidates from "../../images/candidates.png";
import { AiOutlineSearch } from "react-icons/ai";
import "./FinalResults.css";
import { data } from "./data";

const FinalResults = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <div className="candidate-image">
          <img src={firstCandidates} alt="First Candidate" />
          <a href="##">{text}</a>
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
