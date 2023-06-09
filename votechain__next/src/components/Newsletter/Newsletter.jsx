import React from "react";
import "./Newsletter.css";
import Image from "next/image";

const Newsletter = () => {
  return (
    <div className="newsletter-container">
      <div className="newsletter-text">
        <h4>Newsletter</h4>
        <p>Important news about Election Riggings across the world</p>
      </div>
      <div className="newsletter-cards">
        <div className="newsletter-card">
          <Image
            src={"/images/newletter-image-1.png"}
            alt="News Letter Illustration"
            width={100}
            height={100}
          />
          <p className="newsletter-date">Nic Cheeseman • March 24, 2023</p>
          <a
            href="https://www.theafricareport.com/294834/was-the-nigerian-election-rigged/"
            target="_blank"
          >
            Was Nigerian Election
            <br /> Rigged?
          </a>
          <p className="newsletter-brief">
            Even before the Nigerian presidential election results were
            released,the process had been denounced as flawed by some political
            leaders.
          </p>
        </div>
        <div className="newsletter-card">
          <Image
            src={"/images/indian-rig-election.avif"}
            alt="News Letter Illustration"
            width={100}
            height={100}
          />
          <p className="newsletter-date">SANYA DHINGRA • 21 Jan 2019</p>
          <a
            href="https://theprint.in/india/governance/every-indian-election-since-2014-has-been-rigged-claims-masked-us-based-cyber-expert/181089/"
            target="_blank"
          >
            Every Indian election since 2014 has been rigged,
            <br /> claims masked ‘US-based cyber expert
          </a>
          <p className="newsletter-brief">
            Months before the Lok Sabha elections, a masked man who claimed to
            be a US-based cyber expert alleged that every Indian election since
            2014, irrespective of its outcome,
          </p>
        </div>
        <div className="newsletter-card">
          <img
            src={"/images/united-states-image.webp"}
            alt="News Letter Illustration"
          />
          <p className="newsletter-date">BBC Reality Check • 17 October 2020</p>
          <a href="https://www.bbc.com/news/54562611" target="_blank">
            US election 2020: 'Rigged' votes, body
            <br /> doubles and other false claims
          </a>
          <p className="newsletter-brief">
            In the final weeks of the US election campaign all manner of false
            and misleading things are being shared on social media.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
