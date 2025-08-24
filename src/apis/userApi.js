import api from "../util/api";

export const createUserApi = async (userData) => {
  const response = await api.post("/user", userData);
  return response.data;
};
