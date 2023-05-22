import React from "react";
import "./Navbar.css";
import voteLogo from "../../images/demo-logo.png";

const Navbar = () => {
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
        <button>Get Started</button>
      </div>
    </header>
  );
};

export default Navbar;
