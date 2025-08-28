import { Container, Box, Card, CardContent } from "@mui/material";
import Calendar from "./components/Calendar";
import DiaryBox from "./components/DiaryBox";
import ResultsBox from "./components/ResultsBox";
import AiOverlay from "./components/AiOverlay";
import useDiaryStore from "../../stores/useDiaryStore";
import "./DailyPage.style.css";

export default function DailyPage() {
  const { selectedDate, diariesByDate } = useDiaryStore();
  const dateKey = selectedDate.format("YYYY-MM-DD");
  const diary = diariesByDate[dateKey];
  const hasDiary = !!diary;
  const hasAi = !!(diary && diary.comment);

  const calBasisMd = !hasDiary ? "44%" : hasAi ? "27%" : "34%";
  const calMaxMd = !hasDiary ? 680 : hasAi ? 360 : 520;

  const calMinHeight = !hasDiary ? 560 : hasAi ? 360 : 430;

  return (
    <Container maxWidth="xl" sx={{ pt: 4, pb: 6 }} className="daily-page daily-color">
      <AiOverlay />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 2 },
          alignItems: { xs: "center", md: "flex-start" },
          justifyContent: { xs: "flex-start", md: "center" },
          overflow: "visible",
        }}
      >
        <Box
          sx={{
            flexBasis: { md: calBasisMd },
            maxWidth: { md: calMaxMd },
            width: "100%",
            transition: "all .25s ease",
            overflow: "visible",
            mx: { md: 0 },
            alignSelf: "flex-start",
          }}
        >
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 4,
              width: "100%",
              minHeight: { xs: 360, md: calMinHeight },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent
              sx={{
                p: { xs: 2, md: 3 },
                display: "flex",
                flexDirection: "column",
                flex: 1,
                overflow: "visible",
              }}
            >
              <Calendar compact={hasAi} showLegend />
            </CardContent>
          </Card>
        </Box>

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            overflow: "visible",
            width: { xs: 1, md: "100%" },
            maxWidth: "none",
            alignSelf: "flex-start",
          }}
        >
          {hasAi ? <ResultsBox diary={diary} /> : <DiaryBox />}
        </Box>
      </Box>
    </Container>
  );
}
