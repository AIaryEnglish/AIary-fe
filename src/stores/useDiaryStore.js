import { create } from "zustand";
import dayjs from "dayjs";
import { createDiaryApi } from "../apis/diaryApi";

const useDiaryStore = create((set) => ({
  selectedDate: dayjs(),
  diaries: [],

  setSelectedDate: (date) => set({ selectedDate: date }),
  setDiaries: (diary) => set((state) => ({ diaries: [...state.diaries, diary] })),
}));

export default useDiaryStore;
