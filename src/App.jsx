import "./App.css";
import AppRouter from "./routes/AppRouter";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  sessionStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YWJiNjFkMTVjOTc3ODk1YjJkZTQ3NSIsImlhdCI6MTc1NjA4Mzc0MSwiZXhwIjoxNzU2MDg3MzQxfQ.zxiB-SWuAPVzD6YLoExHnCvL31AtmtfzxhK1NpiPHoU"
    //seed에서 나오는 유저아이디로 만든 토큰 사용
  );
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppRouter />
    </LocalizationProvider>
  );
}

export default App;
