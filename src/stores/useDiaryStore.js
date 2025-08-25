import { create } from "zustand";
import dayjs from "dayjs";
import { createDiaryApi } from "../apis/diaryApi";

const useDiaryStore = create((set) => ({
  selectedDate: dayjs(),
  diaries: [],
  isLoading: false,
  error: null,

  setSelectedDate: (date) => set({ selectedDate: date }),

  addDiary: async (diary) => {
    console.log("handleSubmit called");
    set({ isLoading: true, error: null });
    try {
      const result = await createDiaryApi(diary);
      set((state) => ({
        diaries: [...state.diaries, result.diary],
        isLoading: false,
      }));
    } catch (err) {
      set({ error: err.message || "일기 생성 실패", isLoading: false });
      throw err;
    }
  },
}));

export default useDiaryStore;
