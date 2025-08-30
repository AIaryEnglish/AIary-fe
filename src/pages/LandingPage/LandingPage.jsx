import { Box } from "@mui/material";
import "dayjs/locale/ko";
import "./LandingPage.style.css";

import HeroSection from "./components/HeroSection";
import WhySection from "./components/WhySection";
import FeedSection from "./components/FeedSection";
import CallToActionSection from "./components/CallToActionSection";
import FloatingButton from "./components/FloatingButton";
import { useAuthStore } from "../../stores/authStore";

export default function LandingPage() {
  const isLoggedIn = useAuthStore((s) => s.isAuthed());
  return (
    <Box className="landing-root">
      <HeroSection />
      <WhySection />
      <FeedSection />
      <CallToActionSection />
      {!isLoggedIn && <FloatingButton />}
    </Box>
  );
}
