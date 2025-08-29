import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVocab } from "../apis/vocabApi";
import useSnackbarStore from "../stores/useSnackbarStore";

const useCreateVocab = (existingVocab = []) => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useSnackbarStore();

  const mutation = useMutation({
    mutationFn: (word) => createVocab(word),
    onSuccess: (data) => {
      showSuccess(`단어 저장 완료! 저장된 단어: ${data.word}`, 3000, {
        vertical: "top",
        horizontal: "center",
      });
      queryClient.invalidateQueries(["myVocab"]);
    },
    onError: (err) =>
      showError(`단어 저장 실패! ${err.message}`, 3000, {
        vertical: "top",
        horizontal: "center",
      }),
  });

  let pressTimer = null;
  let errorTimer = null; // 5초 카운트
  let isDragging = false;

  const saveWord = (word) => {
    if (!word) return;

    const lowerWord = word.toLowerCase();
    if (existingVocab.includes(lowerWord)) {
      showError(`이미 저장된 단어입니다: ${lowerWord}`, 3000, {
        vertical: "top",
        horizontal: "center",
      });
      return;
    }

    mutation.mutate(lowerWord);
  };

  const handlePressStart = () => {
    isDragging = false;
    const selectedWord = window.getSelection()?.toString().trim();
    if (!selectedWord) return;

    // 3초 후 롱프레스 성공
    pressTimer = setTimeout(() => {
      if (!isDragging) {
        saveWord(selectedWord);
        clearTimeout(errorTimer); // 실패 타이머 취소
      }
    }, 3000);

    // 5초 후 롱프레스 실패 -> 에러 메시지
    errorTimer = setTimeout(() => {
      showError("단어를 다시 한 번 선택해 주세요.", 3000, {
        vertical: "top",
        horizontal: "center",
      });
      clearTimeout(pressTimer); // 성공 타이머 취소
    }, 5000);
  };

  const handlePressMove = () => {
    isDragging = true; // 드래그 중이면 눌러도 저장 방지
  };

  const handlePressEnd = () => {
    clearTimeout(pressTimer);
    clearTimeout(errorTimer);
  };

  return {
    handleMouseDown: handlePressStart,
    handleMouseMove: handlePressMove,
    handleMouseUp: handlePressEnd,
    handleTouchStart: handlePressStart,
    handleTouchEnd: handlePressEnd,
    isLoading: mutation.isLoading,
  };
};

export default useCreateVocab;
