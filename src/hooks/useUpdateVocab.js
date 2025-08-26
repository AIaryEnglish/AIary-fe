import { useMutation } from "@tanstack/react-query";
import { toggleVocabStatus } from "../apis/vocabApi";

const useUpdateVocab = (setVocabList) => {
  const mutation = useMutation({
    mutationFn: toggleVocabStatus,
    onSuccess: (updated) => {
      // 상태 업데이트
      setVocabList((prev) =>
        prev.map((v) => (v._id === updated._id ? updated : v))
      );
    },
    onError: (err) => {
      console.error("업데이트 실패:", err);
    },
  });

  return {
    mutate: mutation.mutate, // 호출할 때 사용
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export default useUpdateVocab;
