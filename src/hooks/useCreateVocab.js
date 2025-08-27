// hooks/useCreateVocab.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVocab } from "../apis/vocabApi";

const useCreateVocab = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (vocab) => createVocab(vocab),
    onSuccess: (data) => {
      alert(`단어 저장 완료: ${data.word}\n뜻: ${data.meaning}`);
      queryClient.invalidateQueries(["myVocab"]); // 필요시 단어장 캐시 갱신
    },
    onError: (error) => {
      alert(`저장 실패: ${error.message}`);
    },
  });

  // 선택된 단어 처리 함수
  const handleSelection = (diary) => {
    if (!diary) return;

    const selected = window.getSelection().toString().trim();
    console.log("selected: ", selected);
    if (!selected) return;

    mutation.mutate(selected);
  };

  // 모바일 롱프레스 처리용
  let pressTimer;

  const handleTouchStart = (diary) => {
    if (!diary) return;
    pressTimer = setTimeout(() => handleSelection(diary), 200);
  };
  const handleTouchEnd = () => clearTimeout(pressTimer);

  return {
    handleSelection,
    handleTouchStart,
    handleTouchEnd,
    isLoading: mutation.isLoading,
  };
};

export default useCreateVocab;
