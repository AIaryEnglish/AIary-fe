import React from "react";
import "../VocabPage.style.css";

const VocabBodyProgress = ({ vocabList }) => {
  const totalWord = vocabList.length;
  const masteredWord = vocabList.filter((v) => v.status === "mastered").length;
  const learningWord = vocabList.filter((v) => v.status === "learning").length;
  const progress = totalWord ? Math.round((masteredWord / totalWord) * 100) : 0;

  return (
    <div className="voca-body-progress">
      <div className="white-card">
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
