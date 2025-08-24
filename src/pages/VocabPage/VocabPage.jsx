import React from "react";
import { useParams } from "react-router-dom";
import VocabHeader from "./component/VocabHeader";
import VocabBodyProgress from "./component/VocabBodyProgress";
import VocabBodySearch from "./component/VocabBodySearch";
import VocabBodyWord from "./component/VocabBodyWord";
import useVocab from "../../hooks/useCreateVocab";
import "./VocabPage.style.css";

const VocabPage = () => {
  const { diaryId } = useParams();
  console.log("diaryId:", diaryId);
  const {
    vocabList,
    filteredList,
    setFilter,
    setSearchQuery,
    handleToggleStatus,
    handleDelete,
  } = useVocab(diaryId);

  return (
    <div>
      <VocabHeader diaryId={diaryId} setVocabList={() => {}} />
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
