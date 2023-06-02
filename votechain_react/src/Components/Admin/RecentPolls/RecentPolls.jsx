import React from "react";
import { Table } from "antd";
import "./RecentPolls.css";

const RecentPolls = () => {
  const columns = [
    {
      title: "NAME OF POLL",
      dataIndex: "nameofpoll",
      key: "nameofpoll",
    },
    {
      title: "CANDIDATES",
      dataIndex: "candidates",
      key: "candidates",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
    },
  ];
  const data = [
    {
      key: "1",
      nameofpoll: "Presidential elections",
      candidates: 21,
      status: "Active",
    },
    {
      key: "2",
      nameofpoll: "Senate elections",
      candidates: 556,
      status: "Inactive",
    },
    {
      key: "3",
      nameofpoll: "House of Representative",
      candidates: 654,
      status: "Inactive",
    },
  ];
  return (
    <div className="recent-polls-container">
      <div className="recent-polls-table">
        <h4>Recent Polls</h4>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default RecentPolls;
