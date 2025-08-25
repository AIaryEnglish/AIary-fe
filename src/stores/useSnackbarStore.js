import { create } from "zustand";

const DEFAULT_DURATION = 3000;
const useSnackbarStore = create((set) => ({
  open: false,
  message: "",
  severity: "info", // 'success', 'error', 'warning', 'info'
  autoHideDuration: DEFAULT_DURATION,

  showSnackbar: (message, severity = "info", duration = DEFAULT_DURATION) => {
    set({
      open: true,
      message,
      severity,
      autoHideDuration: duration,
    });
  },

  hideSnackbar: () => {
    set({ open: false });
  },

  // 편의 함수들
  showSuccess: (message, duration = DEFAULT_DURATION) =>
    set({
      open: true,
      message,
      severity: "success",
      autoHideDuration: duration,
    }),

  showError: (message, duration = DEFAULT_DURATION) =>
    set({ open: true, message, severity: "error", autoHideDuration: duration }),

  showWarning: (message, duration = DEFAULT_DURATION) =>
    set({
      open: true,
      message,
      severity: "warning",
      autoHideDuration: duration,
    }),

  showInfo: (message, duration = DEFAULT_DURATION) =>
    set({ open: true, message, severity: "info", autoHideDuration: duration }),
}));

export default useSnackbarStore;
