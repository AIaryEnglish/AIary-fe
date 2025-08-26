import "./App.css";
import AppRouter from "./routes/AppRouter";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import GlobalSnackbar from "./common/components/GlobalSnackbar";

function App() {
  sessionStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YWQ0NWIzYzg5MGQ5Zjc5YzZiNTg5YSIsImlhdCI6MTc1NjE4NjAzNSwiZXhwIjoxNzU2MTg5NjM1fQ.ob3Cm09HhNneD7T3E7CUZanqZL5IZDVQVBxT4x928Vs"
  ); //토큰 저장
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppRouter />
      <GlobalSnackbar />
    </LocalizationProvider>
  );
}

export default App;
