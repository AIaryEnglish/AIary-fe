import React from "react";
import { Snackbar, Alert } from "@mui/material";
import useSnackbarStore from "../../stores/useSnackbarStore";

const GlobalSnackbar = () => {
  const {
    open,
    message,
    severity,
    autoHideDuration,
    commonPosition,
    hideSnackbar,
  } = useSnackbarStore();

  const isTopCenter =
    commonPosition?.vertical === "top" &&
    commonPosition?.horizontal === "center";

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={hideSnackbar}
      anchorOrigin={commonPosition}
      sx={(theme) => ({
        zIndex: 9000,
        ...(isTopCenter
          ? {
              mt: 0,
              "&.MuiSnackbar-anchorOriginTopCenter": {
                top: theme.spacing(2),
              },
            }
          : {
              mt: { xs: "6.4rem", md: "5rem" },
            }),
      })}
    >
      <Alert onClose={hideSnackbar} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
