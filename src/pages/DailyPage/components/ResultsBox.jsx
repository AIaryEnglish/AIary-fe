import {
  Card,
  CardContent,
  Typography,
  Grow,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import useDiaryStore from "../../../stores/useDiaryStore";
import useCreateVocab from "../../../hooks/useCreateVocab";

import { useQuery } from "@tanstack/react-query";
import { getVocabList } from "../../../apis/vocabApi";
import { useState } from "react";
import NewDiaryDialog from "./NewDiaryDialog";
import useDeleteDiary from "../../../hooks/useDeleteDiary";


const ACCENT = "#00BE83";

//여기서 단어 넘기는 함수 넣기
const ResultsBox = ({ diary }) => {
  const { selectedDate } = useDiaryStore();
  const commentText = diary?.comment;
  const corrections = Array.isArray(diary?.corrections)
    ? diary.corrections
    : [];

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

  const { mutate: deleteDiaryMutate } = useDeleteDiary();

  const [openDialog, setOpenDialog] = useState(false);
  const [mode, setMode] = useState("edit");

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date.toDate());
  };

  const today = dayjs().startOf("day");
  const target = dayjs(diary.createdAt).startOf("day");
  const dayDiff = today.diff(target, "day");
  const isEditableDay = dayDiff >= 0 && dayDiff <= 1;
  const canEdit = diary && isEditableDay;

  const openEditForm = () => {
    setMode("edit");
    setOpenDialog(true);
  };

  const deleteEntry = () => {
    const [year, month] = diary.dateKey.split("-").map(Number);
    deleteDiaryMutate({
      id: diary._id,
      date: diary.dateKey,
      year,
      month,
    });
  };

  return (
    <>
      <Grow in timeout={400}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
            gap: { xs: 2, md: 2 },
            alignItems: "stretch",
          }}
        >
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 4,
              border: "1px solid",
              borderColor: "success.light",
              height: "100%",
            }}
          >

            <CardContent
              sx={{
                maxHeight: { md: "calc(100vh - 220px)" },
                overflowY: "auto",
              }}
            >
              <Typography variant="h6" fontWeight={700} sx={{ color: ACCENT }}>
                Diary for {formatDate(selectedDate)}
                {canEdit && (
                  <>
                    <Button
                      onClick={openEditForm}
                      variant="outlined"
                      color="ACCENT"
                    >
                      일기 수정하기
                    </Button>
                    <Button
                      onClick={deleteEntry}
                      variant="outlined"
                      color="error"
                    >
                      일기 삭제하기
                    </Button>
                  </>
                )}
              </Typography>
              <Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
                {diary?.title}
              </Typography>
              <Typography
                sx={{ whiteSpace: "pre-line" }}
onMouseDown={handleMouseDown}
                              onMouseMove={handleMouseMove}
                              onMouseUp={handleMouseUp}
                              onTouchStart={handleTouchStart}
                              onTouchEnd={handleTouchEnd}
                              style={{ cursor: "pointer" }}
              >
                {diary?.content}
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 4,
              border: "1px solid",
              borderColor: "success.light",
              height: "100%",
            }}
          >
            <CardContent
              sx={{
                maxHeight: { md: "calc(100vh - 220px)" },
                overflowY: "auto",
              }}
            >
              <Typography variant="h6" fontWeight={700} sx={{ color: ACCENT }}>
                AI Comment
              </Typography>

              {commentText && (
                <Typography sx={{ mt: 1, whiteSpace: "pre-line" }}>
                  {commentText}
                </Typography>

              )}

              {corrections.length > 0 && (
                <>
                  <Divider sx={{ my: 1.5 }} />
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ color: ACCENT }}
                  >
                    Sentence Corrections
                  </Typography>
                  <List dense>
                    {corrections.map((c, i) => (
                      <ListItem
                        key={i}
                        sx={{ py: 0.5, alignItems: "flex-start" }}
                      >
                        <ListItemText
                          primary={`• ${c.originalSentence}`}
                          secondary={
                            <>
                              <b
                              onMouseDown={handleMouseDown}
                              onMouseMove={handleMouseMove}
                              onMouseUp={handleMouseUp}
                              onTouchStart={handleTouchStart}
                              onTouchEnd={handleTouchEnd}
                              style={{ cursor: "pointer" }}
                              >→ {c.correctedSentence}</b>
                              {c.reason ? ` — ${c.reason}` : ""}
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      </Grow>
      <NewDiaryDialog
        mode={mode}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        selectedDate={selectedDate}
      />
    </>

  );
};

export default ResultsBox;
