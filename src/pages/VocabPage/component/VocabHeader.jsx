import React from "react";
import "../style/VocabPage.style.css";

const VocabHeader = () => {
  return (
    <div className="voca-header">
      <button className="white-button">&larr; Back</button>
      <span className="voca-header-title">My Vocabulary</span>
      <button className="white-button voca-header-add-button">
        + Add Word
      </button>
    </div>
  );
};

export default VocabHeader;
