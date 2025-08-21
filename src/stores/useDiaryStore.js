import { create } from "zustand";
import dayjs from "dayjs";

const useDiaryStore = create((set) => ({
  selectedDate: dayjs(),
  diaries: [],

  setSelectedDate: (date) => set({ selectedDate: date }),
  addDiary: (date, title, content, image, isPublic) =>
    set((state) => ({
      diaries: [...state.diaries, { date, title, content, image, isPublic }],
    })),
}));

export default useDiaryStore;
