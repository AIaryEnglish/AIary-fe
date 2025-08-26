import api from "../util/api";

console.log("Token sent:", sessionStorage.getItem("token"));

//로그인 후 vocab 리스트 가져오기
export const getVocabList = async () => {
  const response = await api.get("/vocab");
  return response.data.vocabList;
};

// 단어 상태 토글
export const toggleVocabStatus = async (id) => {
  try {
    const response = await api.post(`/vocab/${id}`);
    return response.data.vocab;
  } catch (error) {
    console.error("단어 상태 변경 실패:", error);
    throw error;
  }
};

// 단어 삭제
export const deleteVocab = async (id) => {
  try {
    const response = await api.delete(`/vocab/${id}`);
    return response.data;
  } catch (error) {
    console.error("단어 상태 변경 실패:", error);
    throw error;
  }
};
