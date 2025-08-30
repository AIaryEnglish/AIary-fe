import { useState, useEffect } from "react";
import { IconButton, Box } from "@mui/material";
import { KeyboardArrowUp as KeyboardArrowUpIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 위치 감지
  useEffect(() => {
    const toggleVisibility = () => {
      // 스크롤이 300px 이상 내려갔을 때 버튼 표시
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", toggleVisibility);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // 맨 위로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드러운 스크롤
    });
  };

  return (
    <StyledScrollToTopButton
      isVisible={isVisible}
      onClick={scrollToTop}
      aria-label="맨 위로 이동"
    >
      <KeyboardArrowUpIcon />
    </StyledScrollToTopButton>
  );
};

export default ScrollToTopButton;

// Styled Components
const StyledScrollToTopButton = styled(IconButton)(({ isVisible }) => ({
  position: "fixed",
  bottom: "24px",
  right: "24px",
  zIndex: 1000,
  backgroundColor: "var(--app-chart-1)",
  color: "white",
  width: "56px",
  height: "56px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  opacity: isVisible ? 1 : 0,
  visibility: isVisible ? "visible" : "hidden",
  transform: isVisible ? "translateY(0)" : "translateY(20px)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "var(--app-chart-1)",
    opacity: 0.9,
    transform: "translateY(-2px)",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
  },
  "&:active": {
    transform: "translateY(0)",
  },
  // 모바일에서 터치하기 쉽도록 크기 조정
  "@media (max-width: 768px)": {
    bottom: "20px",
    right: "20px",
    width: "48px",
    height: "48px",
  },
}));
