import React from "react";
import "./HeroPage.css";

const HeroPage = () => {
  return (
    <div className="heropage-container">
      <div className="heropage-texts">
        <div className="main-text">
          <h3>
            Vote For <span>Change,</span>
            <br />
            Vote <span>Wisely</span>
          </h3>
        </div>
        <div className="sub-text">
          <p>
            Powerful, self-serve product and growth
            <br /> analytics to help you convert, engage, and <br />
            retain more users. Trusted by over 4,000 <br />
            startups.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
