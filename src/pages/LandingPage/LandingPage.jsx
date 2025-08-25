import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Container,
  Divider,
} from "@mui/material";

import MenuBookIcon from "@mui/icons-material/MenuBook"; // BookOpen
import TrackChangesIcon from "@mui/icons-material/TrackChanges"; // Target
import FavoriteIcon from "@mui/icons-material/Favorite"; // Heart
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"; // Sparkles
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; // Calendar
import TrendingUpIcon from "@mui/icons-material/TrendingUp"; // TrendingUp
import EditNoteIcon from "@mui/icons-material/EditNote"; // Edit3

import "./LandingPage.style.css";
import useReadAllDiaries from "../../hooks/useReadAllDiaries";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useAuthStore } from "../../stores/authStore";
dayjs.locale("ko");

export default function LandingPage() {
  const { data, isLoading, isError } = useReadAllDiaries();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)();

  // 페이지들을 평탄화 → [{_id,title,content,createdAt,author}, ...]
  const allDiaries = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((p) => p.diaries ?? []);
  }, [data]);

  // 랜딩에서는 최신 3개만 노출
  const displayEntries = allDiaries.slice(0, 3);

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

          {isLoading ? (
            <p className="section-sub">불러오는 중…</p>
          ) : isError ? (
            <p className="section-sub">
              일기를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
            </p>
          ) : (
            <div className="cards-container">
              {displayEntries.length > 0 &&
                displayEntries.map((entry) => {
                  const id = entry._id ?? entry.id;
                  const dateForDisplay =
                    entry.dateKey ?? entry.date ?? entry.createdAt;

                  const formattedDate = entry.dateKey
                    ? dayjs(entry.dateKey, "YYYY-MM-DD").format("M월 D일 dddd")
                    : dayjs(dateForDisplay).format("M월 D일 dddd");

                  const title = entry.title;
                  const content = entry.content;
                  const authorName = entry.author?.name ?? "익명";

                  return (
                    <div key={id}>
                      <div className="card feed-card hoverlift">
                        <CardHeader
                          title={
                            <div className="entry-head">
                              {/* 제목만 표시 (날짜는 아래로 이동) */}
                              <p className="entry-title line-clamp-1">
                                {title}
                              </p>
                            </div>
                          }
                        />
                        <CardContent className="card-body">
                          <p className="entry-content line-clamp-3">
                            {content}
                          </p>

                          {/* 날짜 + 작성자: Divider 바로 위, 우측 하단 */}
                          <div className="entry-meta-bottom">
                            <span className="date">{formattedDate}</span>
                            <span className="sep">|</span>
                            <span className="author" title={authorName}>
                              {authorName}
                            </span>
                          </div>

                          <Divider className="entry-divider" />
                          <Button
                            component={RouterLink}
                            to={`/entry/${id}`}
                            variant="outlined"
                            fullWidth
                            className="btn-outline subtle"
                          >
                            전체 읽기
                          </Button>
                        </CardContent>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

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
      {!isLoggedIn && (
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
      )}
    </Box>
  );
}
