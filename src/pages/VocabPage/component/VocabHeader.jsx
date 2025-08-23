import React from "react";
// import { useNavigate } from "react-router-dom";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import WestIcon from "@mui/icons-material/West";
import "../VocabPage.style.css";

const VocabHeader = () => {
  return (
    <div className="voca-header">
      <button className="white-button">
        <WestIcon sx={{ fontSize: 15 }} /> Back
      </button>
      <TrackChangesIcon className="voca-header-title" sx={{ fontSize: 30 }} />
      <div className="voca-header-title">My Vocabulary</div>
      <button className="white-button voca-header-add-button">
        + Add Word
      </button>
    </div>
  );
};

export default VocabHeader;
