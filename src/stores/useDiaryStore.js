import { create } from "zustand";
import dayjs from "dayjs";

const useDiaryStore = create((set) => ({
  selectedDate: dayjs(),
  diaries: [],
  daysMap: {}, // { "YYYY-MM-DD": { id, canWrite } }
  diariesByDate: {}, // { "YYYY-MM-DD": diaryDoc }

  setSelectedDate: (date) => set({ selectedDate: date }),
  addDiary: (date, title, content, image, isPublic) =>
    set((state) => ({
      diaries: [...state.diaries, { date, title, content, image, isPublic }],
    })),
  setMonthDays: (days) =>
    set(() => {
      const map = {};
      for (const d of days) {
        map[d.date] = { id: d.id, canWrite: d.canWrite };
      }
      return { daysMap: map };
    }),
  setDiaryForDate: (dateKey, diary) =>
    set((state) => ({
      diariesByDate: { ...state.diariesByDate, [dateKey]: diary },
    })),
}));

export default useDiaryStore;
