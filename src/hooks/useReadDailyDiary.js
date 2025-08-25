import { useQuery } from "@tanstack/react-query";
import { readUserDiaryByDate } from "../apis/diaryApi";
import useDiaryStore from "../stores/useDiaryStore";
import { useEffect } from "react";

const useReadDailyDiary = ({ date }) => {
  const { setDiaryForDate } = useDiaryStore();

  const query = useQuery({
    queryKey: ["myDailyDiary", date],
    queryFn: () => readUserDiaryByDate({ date }),
    enabled: !!date,
    staleTime: 30_000,
  });

  useEffect(() => {
    if (query.data) setDiaryForDate(date, query.data.diary ?? null);
  }, [query.data, date, setDiaryForDate]);

  return query;
};

export default useReadDailyDiary;
