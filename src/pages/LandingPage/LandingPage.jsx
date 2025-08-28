import { useMemo } from "react";
import { Box } from "@mui/material";
import useReadAllDiaries from "../../hooks/useReadAllDiaries";
import "dayjs/locale/ko";
import "./LandingPage.style.css";

import HeroSection from "./components/HeroSection";
import WhySection from "./components/WhySection";
import FeedSection from "./components/FeedSection";
import CallToActionSection from "./components/CallToActionSection";
import FloatingButton from "./components/FloatingButton";

export default function LandingPage() {
  const { data, isLoading, isError } = useReadAllDiaries();

  // 페이지들을 평탄화 → [{_id,title,content,createdAt,author}, ...]
  const allDiaries = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((p) => p.diaries ?? []);
  }, [data]);

  // 랜딩에서는 최신 3개만 노출
  const displayEntries = allDiaries.slice(0, 3);

  return (
    <Box className="landing-root">
      <HeroSection />
      <WhySection />
      <FeedSection
        entries={displayEntries}
        isLoading={isLoading}
        isError={isError}
      />
      <CallToActionSection />
      <FloatingButton />
    </Box>
  );
}
