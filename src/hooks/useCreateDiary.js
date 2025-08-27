import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDiaryApi } from "../apis/diaryApi";
import useDiaryStore from "../stores/useDiaryStore";
import useSnackbarStore from "../stores/useSnackbarStore";

import dayjs from "dayjs";

export const useCreateDiary = () => {
  const { setDiaries, setDiaryForDate, setAiPending, setDayHasEntry } =
    useDiaryStore();
    const queryClient = useQueryClient();
  const { showError, showSuccess } = useSnackbarStore();


  const mutation = useMutation({
    mutationFn: (diary) => createDiaryApi(diary),
    onSuccess: (response) => {

      if (response?.status !== "success" || !response?.diary) {
        showError("일기 생성 응답에 문제가 있습니다.");
        return;
      }
      const saved = response.diary;
      setDiaries(saved);

      const dk = dayjs(saved.date).format("YYYY-MM-DD");
      setDiaryForDate(dk, saved);
      setDayHasEntry(dk, saved._id, true);

      showSuccess("일기와 AI 코멘트를 불러왔습니다.", 3000, {
        vertical: "top",
        horizontal: "center",
      });

    },
    onError: (error) =>
      showError(error?.message || "일기 생성 중 오류가 발생했습니다."),
    onSettled: () => setAiPending(false),
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
