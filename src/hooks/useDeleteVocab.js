import { deleteVocab } from "../apis/vocabApi";

const useDeleteVocab = (setVocabList) => {
  const handleDelete = async (id) => {
    try {
      const success = await deleteVocab(id);
      if (success) {
        setVocabList((prev) => prev.filter((v) => v._id !== id));
      }
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  };

  return { handleDelete };
};

export default useDeleteVocab;
