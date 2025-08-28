import { useMemo, useState } from "react";
import NewDiaryDialog from "./NewDiaryDialog";
import { Card, CardContent, Typography, Button, styled } from "@mui/material";
import useDiaryStore from "../../../stores/useDiaryStore";
import dayjs from "dayjs";
import useReadDailyDiary from "../../../hooks/useReadDailyDiary";
import useCreateVocab from "../../../hooks/useCreateVocab";
import { useQuery } from "@tanstack/react-query";
import { getVocabList } from "../../../apis/vocabApi";

const ACCENT = "#00BE83";

const DiaryBox = () => {
  const { selectedDate, diariesByDate } = useDiaryStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [mode, setMode] = useState("new");

  // 단어장에서 기존 단어들 가져오기
  const { data: myVocabWords = [] } = useQuery({
    queryKey: ["myVocab"],
    queryFn: getVocabList,
  });

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchEnd,
  } = useCreateVocab(myVocabWords);
  const dateKey = useMemo(
    () => selectedDate.format("YYYY-MM-DD"),
    [selectedDate]
  );
  useReadDailyDiary({ date: dateKey });

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

  const openAddForm = () => {
    setMode("new");
    setOpenDialog(true);
  };

  return (
    <>
      <Card
        sx={{
          width: 1,
          alignSelf: { xs: "stretch", md: "auto" },
          maxWidth: { xs: "none", md: "unset" },
          height: 560,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          textAlign: "center",
          p: 2,
          mt: 0,
          mx: { xs: 0, md: diary ? 0 : "auto" },
          boxShadow: 4,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "success.light",
        }}
      >
        <CardContent
          sx={{
            overflowY: "auto",
            flexGrow: 1,
          }}
        >
          <DiaryDate>Diary for {formatDate(selectedDate)}</DiaryDate>

          {!diary && (
            <Typography variant="body1" color="text.secondary">
              No Diary for this date yet.
            </Typography>
          )}

          {canCreate && (
            <Button onClick={openAddForm} variant="outlined" color="ACCENT">
              일기 작성하기
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
  color: ACCENT,
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
  whiteSpace: "pre-line",
}));
