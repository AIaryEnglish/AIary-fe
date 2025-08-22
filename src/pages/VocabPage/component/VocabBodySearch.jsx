import React from "react";
import "../style/VocabPage.style.css";
import SearchIcon from "@mui/icons-material/Search";

const VocabBodySearch = () => {
  //   const [query, setQuery] = useState("");

  //   const handleKeyDown = (e) => {
  //     if (e.key === "Enter") {
  //         onSearch(query);
  //     }
  //   };

  return (
    <div className="white-card-long">
      <div className="search-input-place">
        <SearchIcon sx={{ fontSize: 30 }} />
        <input
          type="text"
          className="search-input-box"
          placeholder="Search Vocabulary..."
          // onChange={(e) => setQuery(e.target.value)}
          // onKeyDown={handleKeyDown}
        />
      </div>
      <div className="word-button">
        <button className="white-button">All</button>
        <button className="white-button">Masterd</button>
        <button className="white-button">Learning</button>
      </div>
    </div>
  );
};

export default VocabBodySearch;
