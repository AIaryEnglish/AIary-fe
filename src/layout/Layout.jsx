import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollToTopButton from "../common/components/ScrollToTopButton";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "var(--mui-palette-background-paper)",
          alignItems: { xs: "stretch", md: "stretch" },
          justifyContent: "flex-start",
          px: { xs: 1, md: 0 },
        }}
      >
        <Box sx={{ width: 1 }}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
      <ScrollToTopButton />
    </Box>
  );
};

export default Layout;
