import React from "react";
import { Table, Tag } from "antd";
import firstCandidates from "../../images/candidates.png";
import { AiOutlineSearch } from "react-icons/ai";
import "./FinalResults.css";

const FinalResults = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <div className="candidate-image">
      <img src={firstCandidates} alt="First Candidate"/> 
      <a href="##">{text}</a>
      </div>,
    },
    {
      title: "PARTY",
      dataIndex: "party",
      key: "party",
    },
    {
      title: "TOTAL VOTES",
      dataIndex: "total votes",
      key: "address",
    },
    {
      title: "ACTION",
      key: "action",
      render: () => <Tag color="green">Vote</Tag>,
    },
  ];

  const data = [
    {
      key: "1",
      name:" Imumolen Christopher",
      party: "Accord Party (AP)",
      totalVotes: 12,
    },
    {
      key: "2",
      name: "Imumolen Christopher",
      party: "Accord Party (AP)",
      totalVotes: 12,
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
