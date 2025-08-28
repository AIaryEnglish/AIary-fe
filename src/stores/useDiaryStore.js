import { create } from "zustand";
import dayjs from "dayjs";

const useDiaryStore = create((set) => ({
  selectedDate: dayjs(),
  diaries: [],
  daysMap: {}, // { "YYYY-MM-DD": { id, canWrite } }
  diariesByDate: {}, // { "YYYY-MM-DD": diaryDoc }
  aiPending: false,

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
  setDiaries: (diary) =>
    set((state) => ({ diaries: [...state.diaries, diary] })),
  setAiPending: (v) => set({ aiPending: v }),
  setDayHasEntry: (dateKey, id, canWrite = true) =>
    set((state) => ({
      daysMap: {
        ...state.daysMap,
        [dateKey]: { ...(state.daysMap[dateKey] || {}), id, canWrite },
      },
    })),
}));

export default useDiaryStore;
