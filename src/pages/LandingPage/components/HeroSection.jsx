import { Box, Button, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useAuthStore } from "../../../stores/authStore";

export default function HeroSection() {
  const isLoggedIn = useAuthStore((s) => s.isAuthed());

  return (
    <Box className="hero">
      <Container maxWidth="lg">
        <Box className="hero-inner">
          <Box className="hero-icon">
            <MenuBookIcon className="i-hero" sx={{ fontSize: 80 }} />
            <AutoAwesomeIcon className="i-sparkle" sx={{ fontSize: 25 }} />
          </Box>

          <p className="hero-title">
            영어 일기로 시작하는 <br />
            <span className="hero-title-accent">자연스러운 영어 학습</span>
          </p>

          <p className="hero-desc">
            매일 영어로 일기를 쓰며 자연스럽게 어휘력을 늘리고 표현력을
            키워보세요.
            <br />
            AI가 도와주는 개인 맞춤형 영어 학습 경험을 시작하세요.
          </p>

          <Box className="hero-cta">
            <Button
              component={RouterLink}
              to={isLoggedIn ? "/daily" : "/login"}
              size="large"
              variant="contained"
              className="btn-primary"
              startIcon={<EditNoteIcon fontSize="small" />}
            >
              내 일기 작성하기
            </Button>
          </Box>
        </Box>
      </Container>

      <FavoriteIcon className="i-deco i-deco-left" />
      <TrackChangesIcon className="i-deco i-deco-right" />
    </Box>
  );
}
