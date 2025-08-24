import api from "../util/api";

// 다이어리 ID로 vocab 리스트 가져오기
export const getVocabList = async (diaryId) => {
  const response = await api.get(`/vocab/${diaryId}`);
  return response.data;
};

// 단어 상태 토글
export const toggleVocabStatus = async (id) => {
  const response = await api.post(`/vocab/${id}`);
  return response.data;
};

// 단어 삭제
export const deleteVocab = async (id) => {
  await api.delete(`/vocab/${id}`);
};
