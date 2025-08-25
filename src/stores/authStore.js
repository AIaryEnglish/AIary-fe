import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isLoggedIn: false,

      login: ({ token, user }) => {
        sessionStorage.setItem("token", token);
        set({ token, user, isLoggedIn: true });
      },

      logout: () => {
        sessionStorage.removeItem("token");
        set({ token: null, user: null, isLoggedIn: false });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      // 초기화 시 isLoggedIn 상태 설정
      initializeAuth: () => {
        const state = get();
        if (state.token && state.user) {
          set({ isLoggedIn: true });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          sessionStorage.setItem("token", state.token);
          // 로컬스토리지에서 복원된 상태에 따라 isLoggedIn 설정
          if (state.token && state.user) {
            state.isLoggedIn = true;
          }
        }
      },
    }
  )
);
