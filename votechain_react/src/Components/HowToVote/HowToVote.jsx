import React from "react";
import "./HowtoVote.css";
import inboxIcon from "../../images/inbox icon.png";
import instantIcon from "../../images/instant icon.png";
import reportIcon from "../../images/report icon.png";

const HowToVote = () => {
  return (
    <div className="how-to-vote-container" id="howtovote">
      <div className="how-to-vote-details">
        <h4>How to Vote</h4>
        <div className="how-to-vote-cards">
          <div className="how-to-vote-card">
            <img src={inboxIcon} alt="Inbox Icon" />
            <h5>Share team inboxe</h5>
            <p>
              Whether you have a team of 2 or 200, our shared <br />
              team inboxes keep everyone on the same page
              <br /> and in the loop.
            </p>
          </div>
          <div className="how-to-vote-card">
            <img src={instantIcon} alt="Inbox Icon" />
            <h5>Deliver instant answers</h5>
            <p>
              An all-in-one customer service platform that
              <br /> helps you balance everything your customers <br />
              need to be happy.
            </p>
          </div>

          <div className="how-to-vote-card">
            <img src={reportIcon} alt="Inbox Icon" />
            <h5>Manage your team with reports</h5>
            <p>
              Measure what matters with Untitled’s easy-to-use <br />
              reports. You can filter, export, and drilldown on
              <br /> the data in a couple clicks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToVote;
