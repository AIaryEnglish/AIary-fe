import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Container,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import LogoVer3 from "../../assets/logo_ver3.svg";
import { useAuthStore } from "../../stores/authStore";
import UserAvatar from "./UserAvatar";
import MobileDrawer from "./MobileDrawer";

const menuItems = [
  { text: "홈", path: "/" },
  { text: "일기", path: "/daily" },
  { text: "단어장", path: "/vocab" },
];

const Header = () => {
  const { isLoggedIn, logout, user } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();

  // 스크롤 이벤트 감지
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleToggleLogin = () => {
    if (isLoggedIn) {
      logout();
      return;
    }
    return navigate("/login");
  };

  const isActiveMenu = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <StyledAppBar position="fixed" elevation={0} isScrolled={isScrolled}>
        <Container maxWidth="lg">
          <StyledToolbar>
            <LogoContainer onClick={() => handleNavigation("/")}>
              <LogoImage src={LogoVer3} alt="AIary Logo" />
            </LogoContainer>

            {!isMobile && (
              <DesktopMenu>
                {menuItems.map((item) => (
                  <MenuButton
                    key={item.text}
                    color="inherit"
                    onClick={() => handleNavigation(item.path)}
                    isActive={isActiveMenu(item.path)}
                  >
                    {item.text}
                  </MenuButton>
                ))}
              </DesktopMenu>
            )}

            <DesktopUserSection>
              {isLoggedIn && user && !isMobile && <UserAvatar size={32} />}
              <DesktopAuthButton
                onClick={handleToggleLogin}
                sx={{ display: { xs: "none", md: "block" } }}
              >
                <Tooltip title={isLoggedIn ? "로그아웃" : "로그인"} arrow>
                  {isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
                </Tooltip>
              </DesktopAuthButton>
            </DesktopUserSection>

            {isMobile && (
              <MobileMenuButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </MobileMenuButton>
            )}
          </StyledToolbar>
        </Container>
      </StyledAppBar>

      <MobileDrawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        handleNavigation={handleNavigation}
        handleToggleLogin={handleToggleLogin}
        isLoggedIn={isLoggedIn}
        user={user}
        menuItems={menuItems}
        isActiveMenu={isActiveMenu}
      />

      <HeaderSpacer />
    </>
  );
};

export default Header;

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "isScrolled",
})(({ isScrolled }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  transition: "all 0.3s ease",
  ...(isScrolled && {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    boxShadow: "0 2px 20px rgba(96, 175, 160, 0.15)",
    borderBottom: "1px solid rgba(96, 175, 160, 0.2)",
  }),
}));

const StyledToolbar = styled(Toolbar)({
  justifyContent: "space-between",
  minHeight: 70,
});

const LogoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  "&:hover": {
    opacity: 0.8,
  },
});

const LogoImage = styled("img")({
  width: "100px",
  height: "60px",
  marginRight: "12px",
});

const DesktopMenu = styled(Box)({
  display: "flex",
  gap: "16px",
});

const MenuButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isActive",
})(({ isActive }) => ({
  color: isActive ? "var(--app-chart-2)" : "var(--app-chart-1)",
  fontWeight: isActive ? 600 : 500,
  backgroundColor: isActive ? "rgba(96, 175, 160, 0.1)" : "transparent",
  borderBottom: isActive ? "2px solid var(--app-chart-2)" : "none",
  "&:hover": {
    backgroundColor: "rgba(96, 175, 160, 0.15)",
  },
}));

const DesktopAuthButton = styled(IconButton)({
  color: "var(--app-chart-1)",
  width: 36,
  height: 36,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: "rgba(96, 175, 160, 0.1)",
    transform: "scale(1.1)",
  },
  transition: "all 0.2s ease",
  "& svg": {
    fontSize: 20,
    display: "block",
  },
});

const MobileMenuButton = styled(IconButton)({
  color: "var(--app-chart-1)",
});

const HeaderSpacer = styled(Box)({
  height: 70,
});

const DesktopUserSection = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});
