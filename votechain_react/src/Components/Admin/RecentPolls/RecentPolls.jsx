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
  return (
    <div className="recent-polls-container">
      <div className="recent-polls-table"></div>
    </div>
  );
};

export default RecentPolls;
