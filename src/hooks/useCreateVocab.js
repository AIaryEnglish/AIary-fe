import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVocab } from "../apis/vocabApi";
import useSnackbarStore from "../stores/useSnackbarStore";

const useCreateVocab = (existingVocab = []) => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useSnackbarStore();

  const mutation = useMutation({
    mutationFn: (word) => createVocab(word),
    onSuccess: (data) => {
      showSuccess(`단어 저장 완료! 저장된 단어: ${data.word}`, 3000);
      queryClient.invalidateQueries(["myVocab"]);
    },
    onError: (err) => showError(`단어 저장 실패! ${err.message}`, 3000),
  });

  let pressTimer = null;
  let isDragging = false;

  const saveWord = () => {
    const selected = window.getSelection().toString().trim();
    if (!selected) return;
    if (existingVocab.includes(selected)) {
      showError(`이미 저장된 단어입니다: ${selected}`, 3000);
      return;
    }
    mutation.mutate(selected);
  };

  // 데스크톱 롱프레스
  const handleMouseDown = () => {
    isDragging = false;
    pressTimer = setTimeout(() => {
      if (!isDragging) saveWord();
    }, 3000); // 롱프레스 판정 시간 3초
  };

  const handleMouseMove = () => {
    isDragging = true; // 드래그 중 저장 방지
  };

  const handleMouseUp = () => clearTimeout(pressTimer);

  // 모바일 롱프레스
  const handleTouchStart = () => {
    pressTimer = setTimeout(() => {
      const selected = window.getSelection().toString().trim();
      if (selected) {
        saveWord();
      }
    }, 3000); // 단어 선택 후 롱프레스
  };

  const handleTouchEnd = () => clearTimeout(pressTimer);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchEnd,
    isLoading: mutation.isLoading,
  };
};

export default useCreateVocab;
