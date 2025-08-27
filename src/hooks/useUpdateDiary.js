import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDiaryApi } from "../apis/diaryApi";
import useDiaryStore from "../stores/useDiaryStore";
import useSnackbarStore from "../stores/useSnackbarStore";

export const useUpdateDiary = () => {
  const { setDiaries } = useDiaryStore();
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useSnackbarStore();

  const mutation = useMutation({
    mutationFn: ({ id, diary }) => updateDiaryApi(id, diary),
    onSuccess: (updated) => {
      setDiaries((prev) =>
        prev.map((d) => (d._id === updated._id ? updated : d))
      );
      showSuccess("일기 수정 완료!");
      queryClient.invalidateQueries({ queryKey: ["myDailyDiary"] });
      queryClient.invalidateQueries({ queryKey: ["diaries"] });
    },
    onError: (error) => {
      showError(error.message || "일기 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
