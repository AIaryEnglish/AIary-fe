import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import WestIcon from "@mui/icons-material/West";
import "../VocabPage.style.css";

const VocabHeader = () => {
  const navigate = useNavigate();
  const handleBackToDiary = () => {
    navigate("/diary");
  };

  const [showForm, setShowForm] = useState(false);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="voca-header">
      <button className="white-button" onClick={handleBackToDiary}>
        <WestIcon sx={{ fontSize: 15 }} /> Back
      </button>
      <TrackChangesIcon className="voca-header-title" sx={{ fontSize: 30 }} />
      <div className="voca-header-title">My Vocabulary</div>
      <button
        className="white-button voca-header-add-button"
        onClick={handleOpenForm}
      >
        + Add Word
      </button>

      {/* Add button 해서 단어를 추가하는 게 맞는지? */}
      {showForm && (
        <div className="modal-overlay" onClick={handleCloseForm}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // 배경 클릭 시 닫힘 방지
          >
            <h2>Add a new word</h2>
            <form className="add-word-form">
              <input type="text" placeholder="Enter new word" />
              <input type="text" placeholder="Meaning" />
              <div className="modal-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={handleCloseForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VocabHeader;
