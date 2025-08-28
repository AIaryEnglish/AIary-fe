import { useQuery } from "@tanstack/react-query";
import { getUserDiariesByMonth } from "../apis/diaryApi";
import useDiaryStore from "../stores/useDiaryStore";
import { useEffect } from "react";

const useReadMonthlyDiaries = ({ year, month }) => {
  const { setMonthDays } = useDiaryStore();

  const query = useQuery({
    queryKey: ["myMonthlyDiaries", year, month],
    queryFn: () => getUserDiariesByMonth({ year, month }),
    enabled: Number.isInteger(year) && Number.isInteger(month),
    staleTime: 1000 * 60, // 1분 캐싱
    placeholderData: (prev) => prev,
    retry: 1,
  });

  useEffect(() => {
    if (query.data?.days) {
      setMonthDays(query.data.days);
    } else if (query.isError) {
      console.error("month query error:", query.error);
    }
  }, [query.data, query.isError, query.error, setMonthDays]);

  return query;
};

export default useReadMonthlyDiaries;
