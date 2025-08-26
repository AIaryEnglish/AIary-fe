import { useState, useEffect } from "react";
import { getVocabList } from "../apis/vocabApi";

const useReadVocab = () => {
  const [vocabList, setVocabList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getVocabList()
      .then((data) => setVocabList(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { vocabList, setVocabList, loading };
};

export default useReadVocab;
