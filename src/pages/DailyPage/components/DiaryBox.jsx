import React, { useState } from "react";
import NewDiaryDialog from "./NewDiaryDialog";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import useDiaryStore from "../../../stores/useDiaryStore";
import dayjs from "dayjs";

const DiaryBox = () => {
  const { selectedDate, setSelectedDate, diaries } = useDiaryStore();
  const [openDialog, setOpenDialog] = useState(false);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date.toDate());
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const dateKey = selectedDate.format("YYYY-MM-DD");
  const diary = diaries[dateKey];

  const today = dayjs().startOf("day");
  const target = selectedDate.startOf("day");
  const dayDiff = today.diff(target, "day"); // 0,1,2면 OK / 음수면 미래 / 3이상이면 오래전
  const isWritableDay = dayDiff >= 0 && dayDiff <= 2;

  const canCreate = !diary && isWritableDay;

  return (
    <>
      <Card
        sx={{
          width: { xs: "100%", md: 500 },
          minHeight: 450,
          maxHeight: 450,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          padding: 2,
          mt: 4,
        }}
      >
        <CardContent
          sx={{
            overflowY: "auto", // 세로 스크롤
            flexGrow: 1,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Diary for {formatDate(selectedDate)}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {diary ? diary.content : "No Diary for this date yet."}
          </Typography>
          {canCreate && (
            <Button onClick={() => setOpenDialog(true)} variant="contained">
              일기 작성하기
            </Button>
          )}
        </CardContent>
      </Card>

      <NewDiaryDialog
        open={openDialog}
        onClose={handleCloseDialog}
        selectedDate={selectedDate}
      />
    </>
  );
};

export default DiaryBox;
