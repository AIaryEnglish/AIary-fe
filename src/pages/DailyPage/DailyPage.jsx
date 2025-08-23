import React from "react";
import Grid from "@mui/material/Grid";
import Calendar from "./components/Calendar";
import DiaryBox from "./components/DiaryBox";
import { Container, Typography } from "@mui/material";
import { useAuthStore } from "../../stores/authStore";

const DailyPage = () => {
  const { user } = useAuthStore();
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid
        container
        spacing={4}
        justifyContent="center" // 가로 중앙 정렬
        alignItems="center"
      >
        <Typography variant="h4">{user.name}님의 영어 일기 페이지</Typography>
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
