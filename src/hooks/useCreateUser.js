import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createUserApi } from "../apis/userApi";

const useCreateUser = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createUserApi,
    onSuccess: (response) => {
      if (response.success) {
        alert("회원가입이 완료되었습니다!");
        navigate("/login");
      }
    },
    onError: (error) => {
      console.error("회원가입 실패:", error);
      if (error.message) {
        alert(error.message);
      } else {
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export default useCreateUser;
