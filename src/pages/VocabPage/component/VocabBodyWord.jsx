import React from "react";
import "../VocabPage.style.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const VocabBodyWord = ({ vocab, onToggleStatus, onDelete }) => {
  return (
    <div className="white-card-long">
      {/* 단어 정보 */}
      <div className="word-info">
        <div className="word-title-status-date">
          <div className="word-title">{vocab.word}</div>
          <div
            className={
              vocab.status === "mastered" ? "mastered-box" : "learning-box"
            }
          >
            {vocab.status}
          </div>

          <div className="word-description">
            <CalendarMonthIcon sx={{ fontSize: 20 }} />{" "}
            {new Date(vocab.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="word-title-status-date">
          <span className="word-title">definistion:</span>
          <span className="word-description">{vocab.meaning}</span>
        </div>
        <div className="word-example">
          <span className="word-title">Example:</span>
          <span className="word-description">{vocab.example}</span>
        </div>
      </div>

      {/* 버튼 정보 */}
      <div className="word-actions">
        <button
          className="action-button toggle"
          onClick={() => onToggleStatus(vocab._id)}
        >
          {vocab.status === "mastered" ? "Set Learning" : "Set Mastered"}
        </button>
        <button
          className="action-button delete"
          onClick={() => onDelete(vocab._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default VocabBodyWord;
