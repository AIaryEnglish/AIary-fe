import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import Badge from "@mui/material/Badge";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import useDiaryStore from "../../../stores/useDiaryStore";
import useReadMonthlyDiaries from "../../../hooks/useReadMonthlyDiaries";

// styled에서 props로 isDesktop 받기 (DOM으로 전달되지 않도록 필터)
const StyledDateCalendar = styled(DateCalendar, {
  shouldForwardProp: (prop) => prop !== "isDesktop",
})(({ isDesktop }) => ({
  margin: "10px",
  height: isDesktop ? "500px" : "auto",
  width: isDesktop ? "600px" : "100%",
  maxHeight: "none",
  "& .MuiDayCalendar-weekDayLabel": {
    fontSize: isDesktop ? "1.2rem" : "0.9rem",
    fontWeight: 600,
    marginBottom: "6px",
  },
  "& div[role='row']": { justifyContent: "space-around" },
  "& .MuiDayCalendar-slideTransition": { minHeight: isDesktop ? 500 : 350 },
  "& .MuiPickersDay-root": {
    height: isDesktop ? 70 : 40,
    width: isDesktop ? 70 : 40,
    fontSize: isDesktop ? "1.2rem" : "0.9rem",
    margin: isDesktop ? 4 : 2,
  },
}));

function DayWithDot(props) {
  const { day, outsideCurrentMonth } = props;
  const isDesktop = useMediaQuery("(min-width:768px)");
  const { daysMap } = useDiaryStore.getState(); // 최신 스토어 값
  const dk = day.format("YYYY-MM-DD");
  const hasEntry = !!daysMap[dk]?.id;

  if (outsideCurrentMonth) return <PickersDay {...props} />;

  const DOT = isDesktop ? 10 : 8;
  const TOP = isDesktop ? 26 : 10;
  const RIGHT = isDesktop ? 20 : 12;

  return (
    <Badge
      overlap="circular"
      variant={hasEntry ? "dot" : undefined}
      color="error"
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{
        "& .MuiBadge-badge": { zIndex: 2 },
        "& .MuiBadge-dot": { width: DOT, height: DOT, borderRadius: "50%" },
        "& .MuiBadge-anchorOriginTopRightCircular": { top: TOP, right: RIGHT },
      }}
    >
      <PickersDay {...props} />
    </Badge>
  );
}

export default function Calendar() {
  const { selectedDate, setSelectedDate } = useDiaryStore();
  const [currentView, setCurrentView] = useState("day");
  const isDesktop = useMediaQuery("(min-width:768px)");

  const year = selectedDate.year();
  const month = selectedDate.month() + 1;

  useReadMonthlyDiaries({ year, month });

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StyledDateCalendar
          isDesktop={isDesktop}
          value={selectedDate}
          view={currentView}
          onViewChange={(v) => setCurrentView(v)}
          onChange={(d) => setSelectedDate(d)}
          views={["year", "month", "day"]}
          slots={{ day: DayWithDot }} // 커스텀 데이 적용
          slotProps={{
            day: {
              sx: {
                "&.Mui-selected": { backgroundColor: "#4caf50", color: "#fff" },
                "&.Mui-selected:hover": { backgroundColor: "#388e3c" },
                "&.Mui-selected:focus, &.Mui-selected.Mui-focusVisible": {
                  backgroundColor: "#388e3c",
                  outline: "none",
                },
                "&.MuiPickersDay-today": { border: "2px solid #4caf50" },
              },
            },
          }}
        />
      </LocalizationProvider>

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
}
