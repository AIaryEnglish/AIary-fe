import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  token: sessionStorage.getItem("token") || null,
  user: JSON.parse(sessionStorage.getItem("user") || "null"),

  login: ({ token, user }) => {
    // 세션스토리지 저장
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(user));

    set({ token, user });
  },

  logout: () => {
    // 세션스토리지 제거
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    set({ token: null, user: null });
  },

  isAuthed: () => !!get().token,
}));
