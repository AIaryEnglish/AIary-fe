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
import useReadVocab from "../../../hooks/useReadVocab";
import useCreateVocab from "../../../hooks/useCreateVocab";
import { Switch, FormControlLabel } from "@mui/material";
import { useState } from "react";
import NewDiaryDialog from "./NewDiaryDialog";
import useDeleteDiary from "../../../hooks/useDeleteDiary";
import { updatePublicApi } from "../../../apis/diaryApi";
import { useUpdatePublicDiary } from "../../../hooks/useUpdatePublicDiary";

const ACCENT = "#00BE83";

const ResultsBox = ({ diary, displayedDateKey }) => {
  const { selectedDate } = useDiaryStore();

  const commentText = diary?.comment;
  const corrections = Array.isArray(diary?.corrections)
    ? diary.corrections
    : [];

  // 단어장에서 기존 단어들 가져오기
  const { vocabList } = useReadVocab();

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchEnd,
  } = useCreateVocab(vocabList);

  const { mutate: deleteDiaryMutate } = useDeleteDiary();

  const [openDialog, setOpenDialog] = useState(false);
  const [mode, setMode] = useState("edit");

  const formatDateKey = (dk) =>
    new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(dayjs(dk).toDate());

  const now = dayjs();
  const target = dayjs(diary.createdAt);
  const hoursDiff = now.diff(target, "hour");
  const isEditableDay = hoursDiff <= 24;
  const canEdit = diary && isEditableDay;
  const publicEdit = diary && !isEditableDay;

  const [isPublic, setIsPublic] = useState(diary.isPublic);
  const { mutate: updatePublic, isPending } = useUpdatePublicDiary();

  const handleToggle = () => {
    const newValue = !isPublic;

    updatePublic(
      { id: diary._id, state: { isPublic: newValue } },
      { onSuccess: setIsPublic(newValue) }
    );
  };


  const openEditForm = () => {
    setMode("edit");
    setOpenDialog(true);
  };

  const deleteEntry = () => {
    if (!diary?._id || !diary?.dateKey) return;
    const [year, month] = diary.dateKey.split("-").map(Number);
    deleteDiaryMutate({
      id: diary._id,
      date: diary.dateKey,
      year,
      month,
    });
  };

  const displayStr =
    typeof displayedDateKey === "function"
      ? displayedDateKey(selectedDate)
      : formatDateKey(selectedDate);

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
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent
              sx={{
                maxHeight: { md: "calc(100vh - 220px)" },
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <Typography variant="h6" fontWeight={700} sx={{ color: ACCENT }}>
                Diary for {displayStr}
              </Typography>
              <Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
                {diary?.title ?? ""}
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
                {diary?.content ?? ""}
              </Typography>
              {diary?.image && (
                <img src={diary.image} width={120} alt="image" />
              )}
              <Box
                sx={{
                  mt: "auto",
                  pt: 2,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {canEdit && (
                  <>
                    <Button
                      onClick={openEditForm}
                      variant="outlined"
                      sx={{ ml: 1, borderColor: ACCENT, color: ACCENT }}
                    >
                      일기 수정하기
                    </Button>
                    <Button
                      onClick={deleteEntry}
                      variant="outlined"
                      color="error"
                      sx={{ ml: 1 }}
                    >
                      일기 삭제하기
                    </Button>
                  </>
                )}
                {publicEdit && (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isPublic}
                        onChange={handleToggle}
                        color="success"
                      />
                    }
                    label={isPublic ? "공개" : "비공개"}
                  />
                )}
              </Box>
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
                              >
                                → {c.correctedSentence}
                              </b>
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
