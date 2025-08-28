import { useQuery } from "@tanstack/react-query";
import { getUserDiaryByDate } from "../apis/diaryApi";
import useDiaryStore from "../stores/useDiaryStore";
import { useEffect, useRef } from "react";

const useReadDailyDiary = ({ date }) => {
  const { setDiaryForDate, setDayHasEntry } = useDiaryStore();

  const query = useQuery({
    queryKey: ["myDailyDiary", date],
    queryFn: () => getUserDiaryByDate({ date }),
    enabled: !!date,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    select: (res) => (res?.status === "success" ? res : null),
  });

  // 같은 데이터가 다시 도는 중복 적용 방지
  const appliedAtRef = useRef(0);

  useEffect(() => {
    appliedAtRef.current = 0;
  }, [date]);

  useEffect(() => {
    if (!query.isSuccess || !query.data || query.isPlaceholderData) return;
    if (query.dataUpdatedAt <= appliedAtRef.current) return;

    const diary = query.data.diary ?? null;

    // 날짜별 캐시 갱신 (comment/corrections 포함)
    setDiaryForDate(date, diary);

    // 일기가 있으면 달력 dot도 즉시 보장
    if (diary?._id) setDayHasEntry(date, diary._id, true);

    appliedAtRef.current = query.dataUpdatedAt;
  }, [
    query.isSuccess,
    query.dataUpdatedAt,
    query.data,
    date,
    setDiaryForDate,
    setDayHasEntry,
  ]);

  return query;
};

export default useReadDailyDiary;
