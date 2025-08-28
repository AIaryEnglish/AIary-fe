import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDiaryApi } from "../apis/diaryApi";

const useDeleteDiary = () => {
    const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({id}) => deleteDiaryApi(id),
    onSuccess: (_, variables) => {
        const { date, year, month } = variables;

      queryClient.invalidateQueries({ queryKey: ["myDailyDiary", date] });
      queryClient.invalidateQueries({
        queryKey: ["myMonthlyDiaries", year, month],
      });
      queryClient.invalidateQueries({ queryKey: ["allDiaries"] });
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

export default useDeleteDiary;
