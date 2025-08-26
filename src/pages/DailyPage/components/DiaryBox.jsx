import { useMemo, useState } from "react";
import NewDiaryDialog from "./NewDiaryDialog";
import { Card, CardContent, Typography, Button, styled } from "@mui/material";
import useDiaryStore from "../../../stores/useDiaryStore";
import dayjs from "dayjs";
import useReadDailyDiary from "../../../hooks/useReadDailyDiary";
import useCreateVocab from "../../../hooks/useCreateVocab";

const DiaryBox = () => {
  const { selectedDate, diariesByDate } = useDiaryStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [mode, setMode] = useState("new");
  const { handleSelection, handleTouchStart, handleTouchEnd } =
    useCreateVocab();

  const dateKey = useMemo(
    () => selectedDate.format("YYYY-MM-DD"),
    [selectedDate]
  );

  const { isFetching: isFetchingDiary } = useReadDailyDiary({ date: dateKey });

  const diary = diariesByDate[dateKey] || null;

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date.toDate());
  };

  const today = dayjs().startOf("day");
  const target = selectedDate.startOf("day");
  const dayDiff = today.diff(target, "day"); // 0~2만 작성 가능
  const isWritableDay = dayDiff >= 0 && dayDiff <= 2;
  const canCreate = !diary && isWritableDay;
  const canEdit = diary;

  const openEditForm = (diary) => {
    //edit모드로 설정하고
    setMode("edit");
    // 아이템 수정다이얼로그 열어주기
    // dispatch(setSelectedProduct(product));
    setOpenDialog(true);
  };

  const openAddForm = () => {
    //new 모드로 설정하고
    setMode("new");
    // 다이얼로그 열어주기
    setOpenDialog(true);
  };

  if (isFetchingDiary) {
    return (
      <Typography variant="body1" color="text.secondary">
        Loading...
      </Typography>
    );
  }

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
          <DiaryDate>Diary for {formatDate(selectedDate)}</DiaryDate>

          {diary ? (
            <>
              <DiaryTitle>{diary.title}</DiaryTitle>
              <DiaryContent
                variant="body1"
                onMouseUp={() => handleSelection(diary)}
                onTouchStart={() => handleTouchStart(diary)}
                onTouchEnd={handleTouchEnd}
                style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}
              >
                {diary.content}
              </DiaryContent>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">
              No Diary for this date yet.
            </Typography>
          )}

          {canCreate && (
            <Button onClick={openAddForm} variant="contained">
              일기 작성하기
            </Button>
          )}
          {canEdit && (
            <Button onClick={openEditForm} variant="contained">
              일기 수정하기
            </Button>
          )}
        </CardContent>
      </Card>

      <NewDiaryDialog
        mode={mode}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        selectedDate={selectedDate}
      />
    </>
  );
};

export default DiaryBox;

const DiaryDate = styled(Typography)(({ theme }) => ({
  color: theme.palette.success.light,
  fontWeight: 700,
  fontSize: "25px",
}));

const DiaryTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  fontSize: "25px",
}));

const DiaryContent = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  lineHeight: 1.6,
  whiteSpace: "pre-line", // 줄바꿈 유지
}));
