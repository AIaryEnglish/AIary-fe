import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VocabHeader from "./component/VocabHeader";
import VocabBodyProgress from "./component/VocabBodyProgress";
import VocabBodySearch from "./component/VocabBodySearch";
import VocabBodyWord from "./component/VocabBodyWord";
import "./VocabPage.style.css";

const VocabPage = () => {
  const { diaryId } = useParams();
  console.log("diaryId:", diaryId);
  const [vocabList, setVocabList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filter, setFilter] = useState("All"); // All, Mastered, Learning
  const [searchQuery, setSearchQuery] = useState(""); //Query

  useEffect(() => {
    if (!diaryId) return; // diaryId 없으면 fetch 안함
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/vocab/${diaryId}`)
      .then((res) => res.json())
      .then((data) => {
        setVocabList(data);
        setFilteredList(data);
      })
      .catch(console.error);
  }, [diaryId]);

  useEffect(() => {
    //get 할때 가져올 전체리스트
    console.log("vocabList:", vocabList);
  }, [vocabList]);

  useEffect(() => {
    //상태, 검색어 다 저장
    let filtered = vocabList;

    // 상태 필터링
    if (filter !== "All") {
      filtered = filtered.filter(
        (vocab) => vocab.status.toLowerCase() === filter.toLowerCase()
      );
    }

    // 검색어 필터링
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((vocab) =>
        vocab.word.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredList(filtered);
  }, [filter, searchQuery, vocabList]);

  const handleToggleStatus = async (id) => {
    try {
      const res = await fetch(
        //상대경로에선 막혀서 절대경로 사용
        `${import.meta.env.VITE_BACKEND_URL}/api/vocab/${id}`,
        {
          method: "POST",
        }
      );
      const updated = await res.json(); //응답대기

      setVocabList((prev) =>
        prev.map((v) => (v._id === id ? { ...v, status: updated.status } : v))
      );
    } catch (err) {
      console.error("Toggle failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/vocab/${id}`, {
        method: "DELETE",
      });

      setVocabList((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div>
      <VocabHeader diaryId={diaryId} setVocabList={setVocabList} />
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
