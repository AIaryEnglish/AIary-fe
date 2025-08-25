import api from "../util/api";

export const createDiaryApi = async(diary) => {
    try {
        const response = await api.post("/diary", diary);
        return response.data;
    } catch(err) {
        console.error("일기 생성 실패:", err);
    throw err;
    }
}