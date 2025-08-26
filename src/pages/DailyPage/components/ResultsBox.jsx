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
} from "@mui/material";
import useDiaryStore from "../../../stores/useDiaryStore";

const ACCENT = "#00BE83";

const ResultsBox = ({ diary }) => {
  const { selectedDate } = useDiaryStore();
  const commentText = diary?.comment;
  const corrections = Array.isArray(diary?.corrections)
    ? diary.corrections
    : [];

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date.toDate());
  };

  return (
    <Grow in timeout={400}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
          gap: { xs: 2, md: 2 },
          alignItems: "stretch",
        }}
      >
        <Card sx={{ borderRadius: 3, boxShadow: 4, height: "100%" }}>
          <CardContent
            sx={{
              maxHeight: { md: "calc(100vh - 220px)" },
              overflowY: "auto",
            }}
          >
            <Typography variant="h6" fontWeight={700} sx={{ color: ACCENT }}>
              Diary for {formatDate(selectedDate)}
            </Typography>
            <Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
              {diary?.title}
            </Typography>
            <Typography sx={{ whiteSpace: "pre-line" }}>
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
                            <b>→ {c.correctedSentence}</b>
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
  );
};

export default ResultsBox;
