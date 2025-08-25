import React from "react";
import { Snackbar, Alert } from "@mui/material";
import useSnackbarStore from "../../stores/useSnackbarStore";

const GlobalSnackbar = () => {
  const { open, message, severity, autoHideDuration, hideSnackbar } =
    useSnackbarStore();

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={hideSnackbar}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{
        zIndex: 9000,
        marginTop: { xs: "6.4rem", md: "4rem" },
      }}
    >
      <Alert onClose={hideSnackbar} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
