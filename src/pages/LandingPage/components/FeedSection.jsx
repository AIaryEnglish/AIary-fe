import { Box, Button, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useAuthStore } from "../../../stores/authStore";
import { useEffect, useMemo, useRef, useState } from "react";
import useReadAllDiaries from "../../../hooks/useReadAllDiaries";
import DiaryCard from "./DiaryCard";

dayjs.locale("ko");

export default function FeedSection() {
  const isLoggedIn = useAuthStore((s) => s.isAuthed());

  // 펼침 상태(여러 카드 가능)
  const [openedDiaries, setOpenedDiaries] = useState(() => new Set());
  const toggleOpen = (id) => {
    setOpenedDiaries((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // “잠금 해제” 플래그: 로그인 상태에서도 처음엔 3개만, 버튼 누르면 해제
  const [unlocked, setUnlocked] = useState(false);
  // 로그인 상태 변경 시 초기화(원하면 유지하도록 이 줄 지워도 됨)
  useEffect(() => {
    setUnlocked(false);
  }, [isLoggedIn]);

  // 무한 스크롤 쿼리(첫 페이지는 9개가 캐시에 들어오지만, 표시만 3개로 제어)
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useReadAllDiaries();

  const allDiaries = useMemo(
    () => (data ? data.pages.flatMap((p) => p.diaries ?? []) : []),
    [data]
  );

  // 표시 목록: 비로그인 ⇒ 항상 3개, 로그인 ⇒ 잠금 전 3개 / 잠금 후 전체(무한 스크롤)
  const diaries = useMemo(() => {
    if (!isLoggedIn) return allDiaries.slice(0, 3);
    return unlocked ? allDiaries : allDiaries.slice(0, 3);
  }, [allDiaries, isLoggedIn, unlocked]);

  // sentinel (잠금 해제 후에만 활성화)
  const refForScroll = useRef(null);
  useEffect(() => {
    if (!isLoggedIn || !unlocked) return;
    if (!refForScroll.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(refForScroll.current);
    return () => observer.disconnect();
  }, [isLoggedIn, unlocked, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
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
            {diaries.map((diary) => {
              const id = diary._id ?? diary.id;
              const opened = openedDiaries.has(id);
              return (
                <DiaryCard
                  key={id}
                  diary={diary}
                  isLoggedIn={isLoggedIn}
                  opened={opened}
                  onToggle={() => toggleOpen(id)}
                />
              );
            })}
          </div>
        )}

        {/* 상태 메시지 & 센티넬: 잠금 해제 후에만 */}
        {isLoggedIn && unlocked && (
          <>
            {isFetchingNextPage && (
              <Box textAlign="center" mt={2}>
                <p className="section-sub">더 불러오는 중…</p>
              </Box>
            )}
            <div ref={refForScroll} style={{ height: 1 }} />
          </>
        )}

        {/* CTA 영역 */}
        {!isLoggedIn ? (
          <Box className="feed-cta">
            <Button
              component={RouterLink}
              to="/login"
              variant="outlined"
              size="large"
              className="btn-outline"
            >
              일기 더보기
            </Button>
          </Box>
        ) : !unlocked ? (
          <Box className="feed-cta">
            <Button
              onClick={() => setUnlocked(true)}
              variant="outlined"
              size="large"
              className="btn-outline"
            >
              일기 더보기
            </Button>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
}
