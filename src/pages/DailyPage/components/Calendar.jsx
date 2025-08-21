import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import useDiaryStore from "../../../stores/useDiaryStore";

// styled에서 props로 isDesktop 받기
const StyledDateCalendar = styled(DateCalendar)(({ isDesktop }) => ({
  margin: "10px",
  height: isDesktop ? "500px" : "auto",
  width: isDesktop ? "600px" : "100%",
  maxHeight: "none",
  "& .MuiDayCalendar-weekDayLabel": {
    fontSize: isDesktop ? "1.2rem" : "0.9rem",
    fontWeight: 600,
    marginBottom: "6px",
  },
  "& div[role='row']": {
    justifyContent: "space-around",
  },
  "& .MuiDayCalendar-slideTransition": {
    minHeight: isDesktop ? 500 : 350,
  },
  "& .MuiPickersDay-root": {
    height: isDesktop ? 70 : 40,
    width: isDesktop ? 70 : 40,
    fontSize: isDesktop ? "1.2rem" : "0.9rem",
    margin: isDesktop ? 4 : 2,
  },
  "& .MuiMonthCalendar-root": { // 월 선택 달력 전체
    width: isDesktop ? 500 : 320, // 모바일은 화면 맞춤
    height: isDesktop ? 200 : "100%",
    gap: isDesktop ? 9 : 9,        // 월 버튼 간격
    padding: isDesktop ? "10px" : "4px",
  },
  "& .MuiPickersMonth-root": {       // 개별 월 버튼
    width: isDesktop ? 60 : 40,
    height: isDesktop ? 60 : 32,
    fontSize: isDesktop ? "1rem" : "0.8rem",
    margin: isDesktop ? 4 : 2,
  },
}));

const Calendar = () => {
  const { selectedDate, setSelectedDate, diaries } = useDiaryStore();
  const [currentView, setCurrentView] = useState("day");

  // ✅ 여기서만 선언
  const isDesktop = useMediaQuery("(min-width:768px)");

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StyledDateCalendar
          isDesktop={isDesktop}
          value={selectedDate}
          view={currentView}
          onViewChange={(newView) => setCurrentView(newView)}
          onChange={(newDate) => setSelectedDate(newDate)}
          views={["year", "month", "day"]}
          slotProps={{
            day: {
              sx: {
                "&.Mui-selected": {
                  backgroundColor: "#4caf50",
                  color: "#fff",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#388e3c",
                },
                "&.Mui-selected:focus, &.Mui-selected.Mui-focusVisible": {
                  backgroundColor: "#388e3c",
                  outline: "none",
                },
                "&.MuiPickersDay-today": {
                  border: "2px solid #4caf50",
                },
              },
            },
          }}
        />
      </LocalizationProvider>

      {/* Today / Has Entry 표시 */}
      <div
        style={{
          display: "flex",
          gap: isDesktop ? 16 : 8,
          marginTop: isDesktop ? 12 : 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: isDesktop ? 12 : 10,
              height: isDesktop ? 12 : 10,
              backgroundColor: "#4caf50",
              borderRadius: "50%",
            }}
          />
          <span style={{ fontSize: isDesktop ? 14 : 12, color: "#5D4037" }}>
            Today
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: isDesktop ? 12 : 10,
              height: isDesktop ? 12 : 10,
              backgroundColor: "#FFCCBC",
              border: "2px solid #4caf50",
              borderRadius: "50%",
            }}
          />
          <span style={{ fontSize: isDesktop ? 14 : 12, color: "#5D4037" }}>
            Has Entry
          </span>
        </div>
      </div>

      
    </>
  );
};

export default Calendar;
