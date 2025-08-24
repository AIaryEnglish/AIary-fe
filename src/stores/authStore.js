import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,

      login: ({ token, user }) => {
        sessionStorage.setItem("token", token);
        set({ token, user });
      },

      logout: () => {
        sessionStorage.removeItem("token");
        set({ token: null, user: null });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      isLoggedIn: () => !!get().user,
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          sessionStorage.setItem("token", state.token);
        }
      },
    }
  )
);
