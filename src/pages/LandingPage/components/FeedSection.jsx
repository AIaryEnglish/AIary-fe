import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Container,
  Divider,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useAuthStore } from "../../../stores/authStore";
dayjs.locale("ko");

export default function FeedSection({ entries = [], isLoading, isError }) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)();

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
            {entries.length > 0 &&
              entries.map((entry) => {
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
                  <div key={id} className="card feed-card hoverlift">
                    <CardHeader
                      title={
                        <div className="entry-head">
                          <p className="entry-title line-clamp-1">{title}</p>
                        </div>
                      }
                    />
                    <CardContent className="card-body">
                      <p className="entry-content line-clamp-3">{content}</p>

                      {/* 날짜 + 작성자 */}
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
                        to={isLoggedIn ? "/" : "/login"} // 추후 수정 필요 (로그인 시 전체 내용 조회 가능)
                        variant="outlined"
                        fullWidth
                        className="btn-outline subtle"
                      >
                        전체 읽기
                      </Button>
                    </CardContent>
                  </div>
                );
              })}
          </div>
        )}

        <Box className="feed-cta">
          <Button
            component={RouterLink}
            to={isLoggedIn ? "/" : "/login"} // 추후 수정 필요 (로그인 시 무한 스크롤 구현)
            variant="outlined"
            size="large"
            className="btn-outline"
          >
            일기 더보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
