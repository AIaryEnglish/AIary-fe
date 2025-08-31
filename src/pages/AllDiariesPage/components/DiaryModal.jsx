import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Close as CloseIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import useReadVocab from "../../../hooks/useReadVocab";
import useCreateVocab from "../../../hooks/useCreateVocab";

export default function DiaryModal({
  open,
  onClose,
  diary,
  formattedDate,
  diaries = [],
  currentIndex = 0,
  onPrevious,
  onNext,
}) {
  // 단어장 관련 hooks (early return 이전에 호출)
  const { vocabList } = useReadVocab();
  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchEnd,
  } = useCreateVocab(vocabList);

  if (!diary) return null;

  const { title, content, author, image } = diary;
  const authorName = author?.name;

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < diaries.length - 1;

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: "90vh",
          position: "relative",
        },
      }}
    >
      {/* 좌우 네비게이션 버튼 */}
      {hasPrevious && (
        <NavigationButton
          direction="left"
          onClick={onPrevious}
          aria-label="이전 일기"
        >
          <ChevronLeftIcon />
        </NavigationButton>
      )}

      {hasNext && (
        <NavigationButton
          direction="right"
          onClick={onNext}
          aria-label="다음 일기"
        >
          <ChevronRightIcon />
        </NavigationButton>
      )}

      <DialogTitle
        sx={{
          backgroundColor: "var(--mui-palette-background-paper)",
          color: "var(--app-chart-1)",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="h2" fontWeight={600}>
            {title}
          </Typography>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: "var(--app-chart-1)" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider />

      <StyledDialogContent>
        <ContentWrapper>
          <ContentBox>
            <StyledTypography
              variant="body1"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {content}
            </StyledTypography>
          </ContentBox>
        </ContentWrapper>
        {image && (
          <ImageWrapper>
            <StyledImage src={image} alt="diary" />
          </ImageWrapper>
        )}

        <MetaInfoBox>
          <Typography variant="body2" color="var(--mui-palette-text-secondary)">
            작성자: {authorName}
          </Typography>
          <Typography variant="body2" color="var(--mui-palette-text-secondary)">
            {formattedDate}
          </Typography>
        </MetaInfoBox>
      </StyledDialogContent>
    </StyledDialog>
  );
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    backgroundColor: "var(--mui-palette-background-paper)",
    minHeight: "calc(100dvh - 100px)",
  },
  "& .MuiDialogTitle-root": {
    padding: theme.spacing(2, 4),
    borderBottom: "1px solid var(--app-chart-1)",
  },
  [theme.breakpoints.down("md")]: {
    "& .MuiDialog-paper": {
      minHeight: "calc(100dvh - 200px)",
    },
  },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const ContentWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const ContentBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const StyledTypography = styled(Typography)({
  lineHeight: 1.7,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  overflowWrap: "anywhere",
  color: "var(--mui-palette-text-primary)",
  cursor: "pointer",
});

const ImageWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  textAlign: "center",
}));

const StyledImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "400px",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
});

const MetaInfoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(2),
  paddingTop: theme.spacing(2),
  borderTop: "1px solid var(--app-border)",
}));

const NavigationButton = styled(IconButton)(({ direction, theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 1000,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  border: "1px solid var(--app-border)",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  width: "48px",
  height: "48px",
  ...(direction === "left" ? { left: "10px" } : { right: "10px" }),
  "&:hover": {
    backgroundColor: "var(--app-chart-1)",
    color: "white",
    transform: "translateY(-50%) scale(1.1)",
  },
  "&:disabled": {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    color: "var(--app-muted-fg)",
    cursor: "not-allowed",
  },
  [theme.breakpoints.down("md")]: {
    top: "91%",
    width: "28px",
    height: "28px",
  },
}));
