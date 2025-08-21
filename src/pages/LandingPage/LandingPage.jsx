import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
  Divider,
} from "@mui/material";

import MenuBookIcon from "@mui/icons-material/MenuBook"; // BookOpen
import TrackChangesIcon from "@mui/icons-material/TrackChanges"; // Target
import FavoriteIcon from "@mui/icons-material/Favorite"; // Heart
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"; // Sparkles
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; // Calendar
import TrendingUpIcon from "@mui/icons-material/TrendingUp"; // TrendingUp
import EditNoteIcon from "@mui/icons-material/EditNote"; // Edit3

import "./landing.css";

export default function LandingPage() {
  const [diaryEntries, setDiaryEntries] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("diary-entries");
    if (stored) setDiaryEntries(JSON.parse(stored));
  }, []);

  const sampleEntries = [
    {
      id: "sample-1",
      date: "2024-01-15",
      title: "My First English Diary",
      content:
        "Today I started writing in English. It feels challenging but exciting. I learned new words like 'perseverance' and 'determination'. Writing helps me practice expressing my thoughts in English...",
      vocabularyCount: 5,
    },
    {
      id: "sample-2",
      date: "2024-01-14",
      title: "Weekend Adventures",
      content:
        "I went to the park with my friends. We had a picnic and played frisbee. I practiced describing the beautiful scenery in English. The weather was perfect for outdoor activities...",
      vocabularyCount: 8,
    },
    {
      id: "sample-3",
      date: "2024-01-13",
      title: "Learning Journey",
      content:
        "Every day brings new opportunities to improve my English. Today I watched an English movie without subtitles and understood most of it. I'm proud of my progress...",
      vocabularyCount: 6,
    },
  ];

  const displayEntries =
    diaryEntries.length > 0 ? diaryEntries.slice(0, 3) : sampleEntries;

  return (
    <Box className="landing-root">
      {/* HERO */}
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
                to="/daily"
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

        {/* deco icons */}
        <FavoriteIcon className="i-deco i-deco-left" />
        <TrackChangesIcon className="i-deco i-deco-right" />
      </Box>

      <Box className="why">
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <h3 className="section-title">왜 영어 일기인가요?</h3>
            <p className="section-sub">
              일기 쓰기는 가장 자연스럽고 효과적인 언어 학습 방법입니다.
            </p>
          </Box>

          <div className="cards-container">
            <div className="card why-card">
              <CalendarMonthIcon className="i-card" sx={{ fontSize: 40 }} />
              <p className="card-title">매일의 기록</p>
              <p className="card-text">
                하루하루의 경험을 영어로 기록하며
                <br />
                자연스럽게 표현력을 늘려보세요
              </p>
            </div>

            <div className="card why-card">
              <MenuBookIcon className="i-card accent" sx={{ fontSize: 40 }} />
              <p className="card-title">어휘 확장</p>
              <p className="card-text">
                새로운 단어를 자동으로 수집하고 복습하여
                <br />
                어휘력을 체계적으로 늘려보세요
              </p>
            </div>

            <div className="card why-card">
              <TrendingUpIcon className="i-card" sx={{ fontSize: 40 }} />
              <p className="card-title">성장 추적</p>
              <p className="card-text">
                일기 작성 횟수와 학습한 단어 수를 추적하며
                <br />
                성장을 확인하세요
              </p>
            </div>
          </div>
        </Container>
      </Box>

      <Box className="feed">
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <h3 className="section-title">다른 사람들의 일기</h3>
            <p className="section-sub">
              영어 일기 작성의 다양한 예시를 살펴보고 영감을 받아보세요.
            </p>
          </Box>

          <div className="cards-container">
            {displayEntries.map((entry) => (
              <div key={entry.id}>
                <div className="card hoverlift">
                  <CardHeader
                    title={
                      <div>
                        <div className="entry-meta">
                          <Typography className="entry-date">
                            {new Date(entry.date).toLocaleDateString("ko-KR", {
                              month: "long",
                              day: "numeric",
                            })}
                          </Typography>
                          <div className="entry-vocab">
                            <TrackChangesIcon style={{ fontSize: 14 }} />
                            <span>{entry.vocabularyCount}개 단어</span>
                          </div>
                        </div>
                        <p className="entry-title line-clamp-1">
                          {entry.title}
                        </p>
                      </div>
                    }
                  />
                  <CardContent>
                    <p className="entry-content line-clamp-3">
                      {entry.content}
                    </p>

                    <Divider style={{ margin: "16px 0" }} />

                    <Button
                      component={RouterLink}
                      to={`/entry/${entry.id}`}
                      variant="outlined"
                      fullWidth
                      className="btn-outline subtle"
                    >
                      전체 읽기
                    </Button>
                  </CardContent>
                </div>
              </div>
            ))}
          </div>

          <Box className="feed-cta">
            <Button
              component={RouterLink}
              variant="outlined"
              size="large"
              className="btn-outline"
            >
              일기 더보기
            </Button>
          </Box>
        </Container>
      </Box>

      {/* CTA */}
      <Box className="cta">
        <Container maxWidth="md" style={{ textAlign: "center" }}>
          <h3 className="section-title">오늘부터 Aiary를 시작해보세요</h3>
          <p className="section-sub">
            매일 조금씩 쓰다 보면 어느새 영어로 자유롭게 표현할 수 있게 될
            거예요.
          </p>
        </Container>
      </Box>

      {/* 하단 플로팅 버튼 */}
      <Box className="floating-write-btn">
        <Button
          component={RouterLink}
          to="/register"
          size="large"
          variant="contained"
          className="btn-accent round"
          startIcon={<EditNoteIcon fontSize="small" />}
          sx={{ textTransform: "none" }}
        >
          Aiary 시작하기
        </Button>
      </Box>
    </Box>
  );
}
