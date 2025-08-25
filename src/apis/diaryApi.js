import api from "../util/api";

export const readAllDiaries = async ({ lastId }) => {
  const path = "/diary";
  try {
    const response = await api.get(path, {
      params: { lastId: lastId ?? undefined },
    });
    return response.data;
  } catch (error) {
    console.error("readAllDiaries API 에러:", error);
    throw error;
  }
};

export const readUserDiariesByMonth = async ({ year, month }) => {
  const path = "/diary/my/month";
  try {
    const response = await api.get(path, { params: { year, month } });
    return response.data;
  } catch (error) {
    console.error("readUserDiariesByMonth API 에러:", error);
    throw error;
  }
};

export const readUserDiaryByDate = async ({ date }) => {
  const path = "/diary/my/date";
  try {
    const response = await api.get(path, { params: { date } });
    return response.data;
  } catch (error) {
    console.error("readUserDiaryByDate API 에러:", error);
    throw error;
  }
};
