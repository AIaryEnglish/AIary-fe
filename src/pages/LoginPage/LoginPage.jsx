import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Divider,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import useLoginWithEmail from "../../hooks/useLoginWithEmail";
import LogoVer1 from "../../assets/logo_ver1.svg";
import { useAuthStore } from "../../stores/authStore";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { mutate: loginWithEmail } = useLoginWithEmail();
  const navigate = useNavigate();

  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      navigate(-1);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 에러 메시지 제거
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    } else if (formData.password.length < 6) {
      newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    loginWithEmail({
      email: formData.email,
      password: formData.password,
    });
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <PageContainer>
      <Container maxWidth="sm">
        {/* 뒤로가기 버튼 */}
        <Box sx={{ mb: 3, textAlign: "left" }}>
          <BackButton startIcon={<ArrowBack />} onClick={handleBackToHome}>
            홈으로 돌아가기
          </BackButton>
        </Box>

        {/* 로고 및 제목 */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <LogoContainer>
            <img
              src={LogoVer1}
              alt="AIary Logo"
              style={{
                width: "60px",
                height: "60px",
                objectFit: "contain",
              }}
            />
          </LogoContainer>
        </Box>

        {/* 로그인 폼 */}
        <FormContainer elevation={8}>
          <FormTitle variant="h4" component="h2">
            다시 오신 것을 환영합니다
          </FormTitle>
          <FormDescription variant="body1">
            영어 학습 여정을 계속 이어가보세요
          </FormDescription>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <StyledTextField
              fullWidth
              label="이메일"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              placeholder="이메일을 입력해주세요"
            />

            <StyledTextField
              fullWidth
              label="비밀번호"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              placeholder="비밀번호를 입력해주세요"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <LoginButton
              type="submit"
              fullWidth
              variant="contained"
              size="large"
            >
              로그인
            </LoginButton>

            <Box sx={{ textAlign: "center", mb: 3 }}>
              <ForgotPasswordLink href="#">
                비밀번호를 잊으셨나요?
              </ForgotPasswordLink>
            </Box>

            <Divider sx={{ my: 3 }}>
              <DividerText variant="body2">처음이신가요?</DividerText>
            </Divider>

            <RegisterButton
              fullWidth
              variant="outlined"
              size="large"
              onClick={() => navigate("/register")}
            >
              계정 만들기
            </RegisterButton>
          </Box>
        </FormContainer>
      </Container>
    </PageContainer>
  );
};

export default LoginPage;

// 스타일드 컴포넌트들
const PageContainer = styled(Box)({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f8fffe 0%, #e8f5e8 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "32px 0",
});

const BackButton = styled(Button)({
  color: "var(--app-chart-1)",
  "&:hover": {
    backgroundColor: "rgba(96, 175, 160, 0.1)",
  },
});

const LogoContainer = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 80,
  height: 80,
  borderRadius: "50%",
  backgroundColor: "white",
  marginBottom: 16,
  boxShadow: "0 4px 20px rgba(96, 175, 160, 0.3)",
  border: "2px solid var(--app-chart-1)",
});

const FormContainer = styled(Paper)({
  padding: 32,
  borderRadius: 24,
  backgroundColor: "white",
  boxShadow: "0 8px 32px rgba(96, 175, 160, 0.15)",
});

const FormTitle = styled(Typography)({
  textAlign: "center",
  marginBottom: 8,
  fontWeight: 600,
  color: "var(--app-chart-1)",
});

const FormDescription = styled(Typography)({
  textAlign: "center",
  marginBottom: 32,
  color: "var(--app-muted-fg)",
});

const StyledTextField = styled(TextField)({
  marginBottom: 24,
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "var(--app-border)",
    },
    "&:hover fieldset": {
      borderColor: "var(--app-chart-1)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--app-chart-1)",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "var(--app-chart-1)",
  },
});

const LoginButton = styled(Button)({
  padding: "12px 0",
  marginBottom: 16,
  backgroundColor: "var(--app-chart-1)",
  color: "white",
  fontSize: "1.1rem",
  fontWeight: 600,
  borderRadius: 16,
  textTransform: "none",
  "&:hover": {
    backgroundColor: "var(--app-chart-2)",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(96, 175, 160, 0.4)",
  },
  transition: "all 0.3s ease",
});

const ForgotPasswordLink = styled(Link)({
  color: "var(--app-chart-1)",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
});

const DividerText = styled(Typography)({
  color: "var(--app-muted-fg)",
  padding: "0 16px",
});

const RegisterButton = styled(Button)({
  padding: "12px 0",
  borderColor: "var(--app-chart-1)",
  color: "var(--app-chart-1)",
  fontSize: "1.1rem",
  fontWeight: 600,
  borderRadius: 16,
  textTransform: "none",
  "&:hover": {
    borderColor: "var(--app-chart-2)",
    backgroundColor: "rgba(96, 175, 160, 0.05)",
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s ease",
});
