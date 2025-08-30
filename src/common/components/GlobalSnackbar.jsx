import React, { useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import useSnackbarStore from "../../stores/useSnackbarStore";

const GlobalSnackbar = () => {
  const {
    open,
    message,
    severity,
    hideSnackbar,
    autoHideDuration,
    commonPosition,
  } = useSnackbarStore();

  // 수동 타이머: open이 true가 되면 autoHideDuration 후 상태 hide
  // 자동으로 하면 없어져버려서 수동으로 변경
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      hideSnackbar();
    }, autoHideDuration);

    return () => clearTimeout(timer);
  }, [open, autoHideDuration, hideSnackbar]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={commonPosition}
      sx={{
        zIndex: 9000,
        "&.MuiSnackbar-anchorOriginTopCenter": {
          mt: { xs: "6.4rem", md: "3rem" },
        },
      }}
    >
      <Alert severity={severity} onClose={hideSnackbar} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
