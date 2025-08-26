import { Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useAuthStore } from "../../../stores/authStore";

export default function FloatingButton() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)();
  if (isLoggedIn) return null;

  return (
    <Box className="floating-write-btn">
      <Button
        component={RouterLink}
        to="/login"
        size="large"
        variant="contained"
        className="btn-accent round"
        startIcon={<EditNoteIcon fontSize="small" />}
        sx={{ textTransform: "none" }}
      >
        Aiary 시작하기
      </Button>
    </Box>
  );
}
