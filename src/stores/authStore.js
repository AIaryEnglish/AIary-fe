// stores/useAuthStore.js
import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  token: sessionStorage.getItem("token") || null,
  user: null, // ← 유저는 메모리만

  login: ({ token, user }) => {
    // 토큰만 스토리지에
    sessionStorage.setItem("token", token);
    set({ token, user: user ?? null });
  },

  logout: () => {
    sessionStorage.removeItem("token");
    set({ token: null, user: null });
  },

  isAuthed: () => !!get().token,
}));
