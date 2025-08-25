import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDiaryApi } from "../apis/diaryApi";
import useDiaryStore from "../stores/useDiaryStore";

export const useCreateDiary = () => {
  const { setDiaries } = useDiaryStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (diary) => createDiaryApi(diary),
    onSuccess: (response) => {
      if (response.success) {
        setDiaries(response.data);
        alert("일기 생성 완료!");
        queryClient.invalidateQueries({queryKey:["myDailyDiary"]});
        queryClient.invalidateQueries({queryKey:["diaries"]});
      }
    },
    onError: (error) => {
      if (error.message) {
        alert(error.message);
      } else {
        alert("일기 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
