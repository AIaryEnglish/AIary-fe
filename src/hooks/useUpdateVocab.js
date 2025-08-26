import { toggleVocabStatus } from "../apis/vocabApi";

const useUpdateVocab = (setVocabList) => {
  const handleToggleStatus = async (id) => {
    try {
      const updated = await toggleVocabStatus(id);
      setVocabList((prev) =>
        prev.map((v) => (v._id === id ? { ...v, status: updated.status } : v))
      );
    } catch (err) {
      console.error("업데이트 실패:", err);
    }
  };

  return { handleToggleStatus };
};

export default useUpdateVocab;
