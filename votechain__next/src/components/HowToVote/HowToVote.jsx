import React from "react";
import "./HowtoVote.css";
import { AiOutlineWallet } from "react-icons/ai";
import Image from "next/image";
const HowToVote = () => {
  return (
    <div className="how-to-vote-container" id="howtovote">
      <div className="how-to-vote-details">
        <h4>How to Vote</h4>
        <p>
          We have built Votechain to be as simple to use as possible,
          <br /> here are the steps to be able to vote for your favorite
          candidate
        </p>
        <div className="how-to-vote-cards">
          <div className="how-to-vote-card">
            <h5>Connect Wallet</h5>
            <p>
              The first required step to be able <br />
              to vote is to connect your decentralization
              <br /> wallet e.g(MetaMask, Trust Wallet etc)
            </p>
          </div>
          <div className="how-to-vote-card">
            {/* <Image
              src={"/images/instant icon.png"}
              alt="Inbox Icon"
              width={100}
              height={100}
            /> */}
            <h5>Register to Vote</h5>
            <p>
              The next step is to register
              <br /> to be able to vote and you <br/>are required to provide <br />
              your National Identity Number.
            </p>
          </div>

          <div className="how-to-vote-card">
            <h5>
              Pick your Favorite <br />
              Candidate and Vote
            </h5>
            <p>
              After successful Registeration,<br/> go ahead and navigate to the voting page <br/>and cast your vote and await <br/>the announcement of winner
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToVote;
