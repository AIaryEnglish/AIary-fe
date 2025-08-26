import "./App.css";
import AppRouter from "./routes/AppRouter";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import GlobalSnackbar from "./common/components/GlobalSnackbar";

function App() {
  sessionStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YWQxOGE2YmZiZTYwZTA2YjljZGY4MCIsImlhdCI6MTc1NjE3NDUwMiwiZXhwIjoxNzU2MTc4MTAyfQ.wD5vsmpPR3HwMRkYtXmgu0tI4dxY5MueEq9073vuMcU"
  );
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppRouter />
      <GlobalSnackbar />
    </LocalizationProvider>
  );
}

export default App;
