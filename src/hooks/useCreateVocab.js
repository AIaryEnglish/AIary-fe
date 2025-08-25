import { useState, useEffect } from "react";
import { getVocabList, toggleVocabStatus, deleteVocab } from "../apis/vocabApi";

const useVocab = () => {
  const [vocabList, setVocabList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filter, setFilter] = useState("All"); //All, mastered, learning
  //초기상태를 all로 해두고 all이면 둘 다 포함
  const [searchQuery, setSearchQuery] = useState("");

  // 초기 vocab 불러오기
  useEffect(() => {
    getVocabList()
      .then((data) => {
        setVocabList(data);
        setFilteredList(data);
      })
      .catch(console.error);
  }, []);

  // 필터 및 검색 적용
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

  const handleToggleStatus = async (id) => {
    try {
      const updated = await toggleVocabStatus(id);
      setVocabList((prev) =>
        prev.map((v) => (v._id === id ? { ...v, status: updated.status } : v))
      );
    } catch (err) {
      console.error("상태변경 실패:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVocab(id);
      setVocabList((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  };

  return {
    vocabList,
    filteredList,
    setFilter,
    setSearchQuery,
    handleToggleStatus,
    handleDelete,
  };
};

export default useVocab;
