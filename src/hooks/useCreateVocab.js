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

  const handleMouseDown = () => {
    isDragging = false;
    const selectedWord = window.getSelection()?.toString().trim();
    if (!selectedWord) return;

    pressTimer = setTimeout(() => {
      if (!isDragging) saveWord(selectedWord);
    }, 3000);
  };

  const handleMouseMove = () => {
    isDragging = true;
  };

  const handleMouseUp = () => clearTimeout(pressTimer); // 상태 건드리지 않음

  const handleTouchStart = () => {
    const selectedWord = window.getSelection()?.toString().trim();
    if (!selectedWord) return;

    pressTimer = setTimeout(() => {
      saveWord(selectedWord);
    }, 3000);
  };

  const handleTouchEnd = () => clearTimeout(pressTimer); // 상태 건드리지 않음

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
