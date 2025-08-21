import React from "react";
import VocabHeader from "./component/VocabHeader";
import VocabBodyProgress from "./component/VocabBodyProgress";
import VocabBodySearch from "./component/VocabBodySearch";
import VocabBodyWord from "./component/VocabBodyWord";
import "./style/VocabPage.style.css";

const VocabPage = () => {
  return (
    <div>
      <VocabHeader />
      <div className="voca-page voca-color">
        <VocabBodyProgress />
        <VocabBodySearch />
        <VocabBodyWord />
        <VocabBodyWord />
        <VocabBodyWord />
        <VocabBodyWord />
      </div>
    </div>
  );
};

export default VocabPage;
