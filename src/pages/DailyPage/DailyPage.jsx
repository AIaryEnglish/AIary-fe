import { Container, Box, Card, CardContent } from "@mui/material";
import Calendar from "./components/Calendar";
import DiaryBox from "./components/DiaryBox";
import ResultsBox from "./components/ResultsBox";
import AiOverlay from "./components/AiOverlay";
import useDiaryStore from "../../stores/useDiaryStore";
import "./DailyPage.style.css";
import useReadDailyDiary from "../../hooks/useReadDailyDiary";

export default function DailyPage() {
  const { selectedDate, diariesByDate, displayDateKey } = useDiaryStore();

  // 사용자가 클릭한 날짜(요청을 날릴 키)
  const selectedKey = selectedDate.format("YYYY-MM-DD");

  // 항상 선택된 날짜에 대한 요청은 보냄
  useReadDailyDiary({ date: selectedKey });

  // 이미 store에 선택한 날짜 데이터가 있으면 그걸 "무조건" 우선 표시
  const effectiveKey = displayDateKey ?? selectedKey;

  const diary = diariesByDate[effectiveKey] || null;
  const hasDiary = !!diary;
  const hasAi = !!(diary && diary.comment);

  const calBasisMd = !hasDiary ? "44%" : hasAi ? "27%" : "34%";
  const calMaxMd = !hasDiary ? 680 : hasAi ? 360 : 520;
  const calMinHeight = !hasDiary ? 560 : hasAi ? 360 : 430;

  return (
    <Container
      maxWidth="xl"
      sx={{ mt: 4, pb: 6 }}
      className="daily-page daily-color"
    >
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
        {/* Calendar 카드 */}
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

        {/* 우측 패널 */}
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
          {hasDiary ? (
            <ResultsBox
              key={`res-${effectiveKey}`}
              diary={diary}
              displayedDateKey={effectiveKey}
            />
          ) : (
            <DiaryBox
              key={`box-${effectiveKey}`}
              displayedDateKey={effectiveKey}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
}
