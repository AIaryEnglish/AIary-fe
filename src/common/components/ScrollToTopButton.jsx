import { useState, useEffect } from "react";
import { IconButton, Box } from "@mui/material";
import { KeyboardArrowUp as KeyboardArrowUpIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
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
  "@media (max-width: 768px)": {
    bottom: "20px",
    right: "20px",
    width: "48px",
    height: "48px",
  },
}));
