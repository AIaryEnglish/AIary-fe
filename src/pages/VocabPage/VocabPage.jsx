import React, { useState, useEffect } from "react";
import VocabHeader from "./component/VocabHeader";
import VocabBodyProgress from "./component/VocabBodyProgress";
import VocabBodySearch from "./component/VocabBodySearch";
import VocabBodyWord from "./component/VocabBodyWord";
import "./VocabPage.style.css";

const VocabPage = ({ diaryId }) => {
  const [vocabList, setVocabList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filter, setFilter] = useState("All"); // All, Mastered, Learning

  useEffect(() => {
    fetch(`/api/vocab/${diaryId}`)
      .then((res) => res.json())
      .then((data) => {
        setVocabList(data);
        setFilteredList(data);
      })
      .catch(console.error);
  }, [diaryId]);

  useEffect(() => {
    if (filter === "All") setFilteredList(vocabList);
    else
      setFilteredList(
        vocabList.filter(
          (vocab) => vocab.status.toLowerCase() === filter.toLowerCase()
        )
      );
  }, [filter, vocabList]);

  return (
    <div>
      <VocabHeader
        diaryId="64f0c2e1ab1234abcd567890"
        setVocabList={setVocabList}
      />
      <div className="voca-page voca-color">
        <VocabBodyProgress vocabList={vocabList} />
        <VocabBodySearch setFilter={setFilter} />
        {filteredList.map((vocab) => (
          <VocabBodyWord key={vocab._id} vocab={vocab} />
        ))}
      </div>
    </div>
  );
};

export default VocabPage;
