import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import voteLogo from "../../images/demo-logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  };
  return (
    <header>
      <div className="navbar-container">
        <img src={voteLogo} alt="Vote Logo" />
        <ul className="nav-list">
          <li>
            <a href="/">Mission</a>
          </li>
          <li>
            <a href="/">How To Vote</a>
          </li>
          <li>
            <a href="/">FAQs</a>
          </li>
        </ul>
        <button onClick={handleNavigate}>Get Started</button>
      </div>
    </header>
  );
};

export default Navbar;
