import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/VocabPage.style.css";

const VocabBodyProgress = () => {
  const navigate = useNavigate();
  //숫자들 하드코딩
  const totalWord = 4;
  const masteredWord = 3;
  const learningWord = 1;
  const progress = (masteredWord / totalWord) * 100;

  return (
    <div className="voca-body-progress">
      <div className="white-card" onClick={() => navigate("/")}>
        <span className="voca-black-bold">{totalWord}</span>
        Total Words
      </div>
      <div className="white-card">
        <span className="voca-green-bold">{masteredWord}</span>
        Mastered
      </div>
      <div className="white-card">
        <span className="voca-red-bold">{learningWord}</span>Learning
      </div>
      <div className="white-card">
        <span className="voca-black-bold">{progress}%</span>Progress
      </div>
    </div>
  );
};

export default VocabBodyProgress;
