import React from "react";
import "./SubHeroPage.css";
import firstSubHeroPage from "../../images/sub-hero-image1.png";
import secondSubHeroPage from "../../images/sub-hero-image2.png";

const SubHeroPage = () => {
  return (
    <div className="super-hero-container">
      <div className="super-hero-images">
        <div>
          <img src={firstSubHeroPage} alt="" />
        </div>
        <div>
          <img src={secondSubHeroPage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SubHeroPage;
