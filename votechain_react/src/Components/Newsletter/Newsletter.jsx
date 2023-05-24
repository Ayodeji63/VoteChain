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
          <img src={newsLetterImage1} alt="News Letter Illustration" />
          <p className="newsletter-date">Natali Craig • 14 Jan 2022</p>
          <a href="##">
            Nigeria election results: Peter Obi lands
            <br /> surprise win in Lagos State
          </a>
          <p className="newsletter-brief">
            Collaboration can make our teams stronger, and our <br />
            individual designs better.
          </p>
        </div>
        <div className="newsletter-card">
          <img src={newsLetterImage2} alt="News Letter Illustration" />
          <p className="newsletter-date">Drew Cano • 13 Jan 2022</p>
          <a href="##">
            Nigeria's Elections Risk Sowing <br />
            Cynicism, Mistrust | Council on Foreign Relations
          </a>
          <p className="newsletter-brief">
            JavaScript frameworks make development easy with <br />
            extensive features and functionalities.
          </p>
        </div>
        <div className="newsletter-card">
          <img src={newsLetterImage3} alt="News Letter Illustration" />
          <p className="newsletter-date">Orlando Diggs • 12 Jan 2022</p>
          <a href="##">
            Nigeria presidential election 2023 |<br /> Financial Times
          </a>
          <p className="newsletter-brief">
            Starting a community doesn’t need to be
            <br /> complicated, but how do you get started?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
