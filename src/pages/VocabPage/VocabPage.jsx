import React, { useState, useEffect } from "react";
import VocabHeader from "./component/VocabHeader";
import VocabBodyProgress from "./component/VocabBodyProgress";
import VocabBodySearch from "./component/VocabBodySearch";
import VocabBodyWord from "./component/VocabBodyWord";

import useReadVocab from "../../hooks/useReadVocab";
import useUpdateVocab from "../../hooks/useUpdateVocab";
import useDeleteVocab from "../../hooks/useDeleteVocab";

import "./VocabPage.style.css";

const VocabPage = () => {
  //단어목록, 상태변화 훅들 불러오기
  const { vocabList, setVocabList } = useReadVocab();
  const { handleToggleStatus } = useUpdateVocab(setVocabList);
  const { handleDelete } = useDeleteVocab(setVocabList);

  // 필터, 검색 상태 전용
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  // 필터링, 검색 적용
  useEffect(() => {
    let filtered = vocabList;

    if (filter !== "All") {
      filtered = filtered.filter(
        (v) => v.status.toLowerCase() === filter.toLowerCase()
      );
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((v) =>
        v.word.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredList(filtered);
  }, [filter, searchQuery, vocabList]);

  return (
    <div>
      <VocabHeader setVocabList={() => {}} />
      <div className="voca-page voca-color">
        <VocabBodyProgress vocabList={vocabList} setFilter={setFilter} />
        <VocabBodySearch
          setFilter={setFilter}
          setSearchQuery={setSearchQuery}
        />
        {filteredList.map((vocab) => (
          <VocabBodyWord
            key={vocab._id}
            vocab={vocab}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default VocabPage;
