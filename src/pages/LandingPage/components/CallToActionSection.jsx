import { Box, Container, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function CallToActionSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box className="cta">
      <Container maxWidth="md" style={{ textAlign: "center" }}>
        <p className="section-title">오늘부터 Aiary를 시작해보세요</p>
        <p className="section-sub">
          매일 조금씩 쓰다 보면 어느새 영어로 {isMobile && <br />}자유롭게
          표현할 수 있게 될 거예요.
        </p>
      </Container>
    </Box>
  );
}
