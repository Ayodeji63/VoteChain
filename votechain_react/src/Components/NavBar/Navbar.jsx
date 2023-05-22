import React from "react";
import "./Navbar.css";
import {voteLogo} from "../../images/demo-logo.png"

const Navbar = () => {
  return (
    <header>
      <div className="navbar-container">
        <img src={voteLogo} alt="Vote Logo"/>
      </div>
    </header>
  );
};

export default Navbar;
