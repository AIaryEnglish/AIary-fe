import { useQuery } from "@tanstack/react-query";
import { getTotalPublicDiariesCount } from "../apis/diaryApi";

const useTotalDiariesCount = () => {
  return useQuery({
    queryKey: ["totalDiariesCount"],
    queryFn: getTotalPublicDiariesCount,
    staleTime: 5 * 60_000,
    gcTime: 10 * 60_000,
    retry: 1,
  });
};

export default useTotalDiariesCount;
