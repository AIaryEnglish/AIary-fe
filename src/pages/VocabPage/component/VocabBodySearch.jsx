import React from "react";
import "../VocabPage.style.css";
import SearchIcon from "@mui/icons-material/Search";

const VocabBodySearch = ({ setFilter }) => {
  return (
    <div className="white-card-long">
      <div className="search-input-place">
        <SearchIcon sx={{ fontSize: 30 }} />
        <input
          type="text"
          className="search-input-box"
          placeholder="Search Vocabulary..."
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="word-button">
        <button className="white-button" onClick={() => setFilter("All")}>
          All
        </button>
        <button className="white-button" onClick={() => setFilter("mastered")}>
          Mastered
        </button>
        <button className="white-button" onClick={() => setFilter("learning")}>
          Learning
        </button>
      </div>
    </div>
  );
};

export default VocabBodySearch;
