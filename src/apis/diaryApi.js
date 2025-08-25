import api from "../util/api";

export const getAllDiaries = async ({ lastId }) => {
  const path = "/diary";
  try {
    const response = await api.get(path, {
      params: { lastId: lastId ?? undefined },
    });
    return response.data;
  } catch (error) {
    console.error("getAllDiaries API 에러:", error);
    throw error;
  }
};

export const getUserDiariesByMonth = async ({ year, month }) => {
  const path = "/diary/my/month";
  try {
    const response = await api.get(path, { params: { year, month } });
    return response.data;
  } catch (error) {
    console.error("getUserDiariesByMonth API 에러:", error);
    throw error;
  }
};

export const getUserDiaryByDate = async ({ date }) => {
  const path = "/diary/my/date";
  try {
    const response = await api.get(path, { params: { date } });
    return response.data;
  } catch (error) {
    console.error("getUserDiaryByDate API 에러:", error);
    throw error;
  }
};
export const createDiaryApi = async (diary) => {
  try {
    const response = await api.post("/diary", diary);
    return response.data;
  } catch (err) {
    console.error("일기 생성 실패:", err);
    throw err;
  }
};
