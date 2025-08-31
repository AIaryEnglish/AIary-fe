import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";

export default function FloatingButton() {
  const navigate = useNavigate();

  const handleStartAiary = () => {
    navigate("/login");
  };

  return (
    <Box className="floating-write-btn">
      <Button
        onClick={handleStartAiary}
        size="large"
        variant="contained"
        className="btn-accent round"
        startIcon={<EditNoteIcon fontSize="small" />}
        sx={{ textTransform: "none", fontWeight: 700 }}
      >
        Aiary 시작하기
      </Button>
    </Box>
  );
}
