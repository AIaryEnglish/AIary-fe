import { useMutation } from "@tanstack/react-query";
import { createDiaryApi } from "../apis/diaryApi";

export const useCreateDiary = () => {
  return useMutation({
    mutationFn: (diary) => createDiaryApi(diary),
  });
};