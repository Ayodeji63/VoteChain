import React, { useEffect } from "react";
import "./HeroPage.css";
import { useNavigate } from "react-router-dom";
import BloctoButton from "../blocto_test/component/Button";
import { bloctoSDK } from "../blocto_test/services/ethereum";
import { useContext } from "react";
import { HookContext } from "../../context/hook";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { SignIn } from "../ConnectButton/ConnectButton";
import { useAccount } from "wagmi";
const HeroPage = () => {
  const navigate = useNavigate();
  const { address } = useAccount();
  useEffect(() => {
    address ? navigate("/welcome") : navigate("/");
  }, [address]);
  return (
    <div className="heropage-container">
      <div className="heropage-texts">
        <div className="main-text">
          <h3>
            Vote For <span>Change,</span>
            <br />
            Vote <span>Wisely</span>
          </h3>

          <SignIn showBalance={false} className="hero-page-btn" />
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
