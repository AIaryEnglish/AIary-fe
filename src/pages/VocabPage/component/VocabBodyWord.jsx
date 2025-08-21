import React from "react";
import "../style/VocabPage.style.css";

const VocabBodyWord = () => {
  //하드코딩
  return (
    <div className="white-card-long">
      <div className="word-title-status-date">
        <div className="word-title">green</div>
        <div className="mastered-box">Mastered</div>
        <div className="word-description">2025.04.02</div>
      </div>
      <div className="word-title-status-date">
        <span className="word-title">definistion:</span>
        <span className="word-description">
          having the colour of grass or the leaves of most plants and trees
        </span>
      </div>
      <div className="word-example">
        <span className="word-title">Example:</span>
        <span className="word-description">
          Wait for the light to turn green (= on traffic lights).
        </span>
      </div>
    </div>
  );
};

export default VocabBodyWord;
