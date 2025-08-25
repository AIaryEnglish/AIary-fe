import React from "react";
import VocabHeader from "./component/VocabHeader";
import VocabBodyProgress from "./component/VocabBodyProgress";
import VocabBodySearch from "./component/VocabBodySearch";
import VocabBodyWord from "./component/VocabBodyWord";
import useVocab from "../../hooks/useCreateVocab";
import "./VocabPage.style.css";

const VocabPage = () => {
  const {
    vocabList,
    filteredList,
    setFilter,
    setSearchQuery,
    handleToggleStatus,
    handleDelete,
  } = useVocab();

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
