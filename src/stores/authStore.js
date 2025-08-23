import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  token: sessionStorage.getItem("token") || null,
  user: null,

  login: ({ token, user }) => {
    sessionStorage.setItem("token", token);
    set({ token, user: user ?? null });
  },

  logout: () => {
    sessionStorage.removeItem("token");
    set({ token: null, user: null });
  },

  isAuthed: () => !!get().token,
}));
