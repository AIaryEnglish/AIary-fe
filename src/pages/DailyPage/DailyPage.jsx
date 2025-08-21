import React from "react";
import Grid from "@mui/material/Grid";
import Calendar from "./components/Calendar";
import DiaryBox from "./components/DiaryBox";
import { Container } from "@mui/material";

const DailyPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid
        container
        spacing={4}
        justifyContent="center" // 가로 중앙 정렬
        alignItems="center"
      >
        <Grid item xs={12} sm={12} md={8}>
          <Calendar />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DiaryBox />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DailyPage;
