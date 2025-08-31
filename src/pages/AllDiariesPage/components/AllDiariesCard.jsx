import {
  Button,
  CardContent,
  CardHeader,
  Divider,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { PhotoCamera as PhotoCameraIcon } from "@mui/icons-material";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useRef } from "react";
import useIsShortText from "../../../hooks/useIsShortText";
import useReadVocab from "../../../hooks/useReadVocab";
import useCreateVocab from "../../../hooks/useCreateVocab";

dayjs.locale("ko");

const AllDiariesCard = ({ diary, onOpenModal }) => {
  const dateForDisplay = diary.dateKey ?? diary.date ?? diary.createdAt;
  const formattedDate = diary.dateKey
    ? dayjs(diary.dateKey, "YYYY-MM-DD").format("M월 D일 dddd")
    : dayjs(dateForDisplay).format("M월 D일 dddd");
  const title = diary.title;
  const content = diary.content;
  const authorName = diary.author.name;

  const contentRef = useRef(null);
  const isShort = useIsShortText(contentRef);

  const { vocabList } = useReadVocab();

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchEnd,
  } = useCreateVocab(vocabList);

  const handleReadMore = () => {
    onOpenModal(diary);
  };

  return (
    <>
      <StyledCard>
        {/* 이미지가 있는 경우 카메라 아이콘 표시 */}
        {diary.image && (
          <CameraIconWrapper>
            <PhotoCameraIcon />
          </CameraIconWrapper>
        )}

        <StyledCardHeader
          title={
            <EntryHead>
              <EntryTitle>{title}</EntryTitle>
            </EntryHead>
          }
        />
        <StyledCardContent hasCta={(!isShort).toString()}>
          <EntryContent
            ref={contentRef}
            isShort={isShort.toString()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {content}
          </EntryContent>

          <EntryMetaBottom>
            <DateSpan>{formattedDate}</DateSpan>
            <SepSpan>|</SepSpan>
            <AuthorSpan title={authorName}>{authorName}</AuthorSpan>
          </EntryMetaBottom>

          <>
            <StyledDivider />
            <StyledButton
              onClick={handleReadMore}
              variant="outlined"
              fullWidth
              className="btn-outline subtle"
            >
              전체 읽기
            </StyledButton>
          </>
        </StyledCardContent>
      </StyledCard>
    </>
  );
};

export default AllDiariesCard;

// Styled Components
const StyledCard = styled(Box)({
  border: "1px solid var(--app-border)",
  backgroundColor: "white",
  borderRadius: "6px",
  width: "350px",
  padding: "20px 0 10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  boxShadow: "none",
  transition: "box-shadow 0.2s ease, transform 0.2s ease",
  minHeight: "265px", // collapsed state
  position: "relative",
  paddingTop: "0px",
  paddingBottom: "0px",
  boxSizing: "border-box",
  alignSelf: "stretch",
  "&:hover": {
    border: "2px solid var(--app-chart-1)",
    boxShadow:
      "0 8px 20px color-mix(in oklab, var(--app-ring) 40%, transparent)",
    transform: "translateY(-4px)",
  },
});

const StyledCardHeader = styled(CardHeader)({
  padding: "0 20px",
  minHeight: "auto",
  boxSizing: "border-box",
  width: "100%",
});

const StyledCardContent = styled(CardContent)(({ hasCta }) => ({
  width: "100%",
  alignSelf: "stretch",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  padding: "0 20px 12px",
  boxSizing: "border-box",
  textAlign: "left",
  flex: hasCta === "true" ? "0 0 auto" : "1 1 auto",
}));

const EntryHead = styled(Box)({
  width: "100%",
});

const EntryTitle = styled(Typography)({
  fontSize: "22px",
  fontWeight: 900,
  margin: "20px 0 15px 0",
  lineHeight: 1.4,
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "normal",
});

const EntryContent = styled(Typography)(({ isShort }) => ({
  margin: 0,
  color: "var(--mui-palette-text-secondary)",
  lineHeight: 1.7,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  overflowWrap: "anywhere",
  textAlign: "left",
  cursor: "pointer",
  ...(isShort !== "true" && {
    whiteSpace: "normal",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
}));

const EntryMetaBottom = styled(Box)({
  marginTop: "auto",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "6px",
  width: "100%",
  fontSize: "13px",
  color: "var(--mui-palette-text-secondary)",
  textAlign: "right",
});

const DateSpan = styled("span")({
  fontSize: "13px",
  color: "var(--mui-palette-text-secondary)",
});

const SepSpan = styled("span")({
  opacity: 0.6,
});

const AuthorSpan = styled("span")({
  maxWidth: "140px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

const StyledDivider = styled(Divider)({
  width: "100%",
  margin: 0,
});

const StyledButton = styled(Button)({
  width: "100%",
  fontWeight: 700,
});

const CameraIconWrapper = styled(Box)({
  position: "absolute",
  top: "12px",
  right: "12px",
  zIndex: 10,
  color: "var(--app-chart-1)",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "50%",
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid var(--app-chart-1)",
  "& .MuiSvgIcon-root": {
    fontSize: "18px",
    color: "var(--app-chart-1)",
  },
});
