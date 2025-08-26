import { useMutation } from "@tanstack/react-query";
import { deleteVocab } from "../apis/vocabApi";

const useDeleteVocab = (setVocabList) => {
  const mutation = useMutation({
    mutationFn: deleteVocab,
    onSuccess: (deletedId) => {
      // 삭제 성공 시 리스트에서 제거
      setVocabList((prev) => prev.filter((v) => v._id !== deletedId));
    },
    onError: (err) => {
      console.error("삭제 실패:", err);
    },
  });

  return {
    mutate: mutation.mutate, // 호출할 때 사용
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export default useDeleteVocab;
