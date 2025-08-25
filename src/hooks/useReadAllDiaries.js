import { useInfiniteQuery } from "@tanstack/react-query";
import { readAllDiaries } from "../apis/diaryApi";

const useReadAllDiaries = () => {
  return useInfiniteQuery({
    queryKey: ["allDiaries"],
    queryFn: ({ pageParam }) => readAllDiaries({ lastId: pageParam ?? null }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.nextLastId ?? null,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    retry: 1,
  });
};

export default useReadAllDiaries;
