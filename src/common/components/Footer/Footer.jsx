import React from "react";
import { Box, Container, Typography, Link, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

const Footer = () => {
  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <FooterContent>
          <FooterSection>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              AIary
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              영어 일기 작성의 새로운 경험
            </Typography>
            <Typography variant="body2" color="text.secondary">
              AI와 함께하는 스마트한 영어 학습
            </Typography>
          </FooterSection>

          <FooterSection>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              서비스
            </Typography>
            <FooterLink href="/daily">일기 작성</FooterLink>
            <FooterLink href="/vocab">단어장</FooterLink>
            <FooterLink href="/all-diaries">모든 일기</FooterLink>
          </FooterSection>

          <FooterSection>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              지원
            </Typography>
            <FooterLink href="/login">로그인</FooterLink>
            <FooterLink href="/register">회원가입</FooterLink>
          </FooterSection>
        </FooterContent>

        <Divider sx={{ my: 3 }} />

        <FooterBottom>
          <Typography variant="body2" color="text.secondary">
            © 2024 AIary. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Made with ❤️ for English learners
          </Typography>
        </FooterBottom>
      </Container>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(4, 0, 2),
  marginTop: "auto",
}));

const FooterContent = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(3),
  },
}));

const FooterSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: "none",
  marginBottom: theme.spacing(0.5),
  "&:hover": {
    color: theme.palette.primary.main,
    textDecoration: "underline",
  },
}));

const FooterBottom = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: theme.spacing(1),
    textAlign: "center",
  },
}));
