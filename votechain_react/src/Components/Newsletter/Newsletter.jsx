import React from "react";
import "./Newsletter.css";
import newsLetterImage1 from "../../images/newletter-image-1.png";
import newsLetterImage2 from "../../images/newletter-image-2.png";
import newsLetterImage3 from "../../images/newletter-image-3.png";

const Newsletter = () => {
  return (
    <div className="newsletter-container">
      <div className="newsletter-text">
        <h4>Newsletter</h4>
        <p>Everything you need to know about the product and billing.</p>
      </div>
      <div className="newsletter-cards">
        <div className="newsletter-card">
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
