import { useMutation } from "@tanstack/react-query";
import { loginWithEmailApi } from "../apis/authApi";
import { useAuthStore } from "../stores/authStore";
import { useNavigate, useLocation } from "react-router-dom";
import useSnackbarStore from "../stores/useSnackbarStore";

const useLoginWithEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();
  const { showSuccess, showError } = useSnackbarStore();
  const mutation = useMutation({
    mutationFn: loginWithEmailApi,
    onSuccess: (response) => {
      if (response.status === "success") {
        login({ token: response.token, user: response.user });
        showSuccess("로그인 성공!");

        // 리디렉션으로 온 경우 원래 페이지로, 직접 로그인 페이지에 온 경우 랜딩페이지로
        const from = location.state?.from?.pathname;
        if (from && from !== "/login") {
          navigate(from, { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
      if (error.message) {
        showError(error.message);
      } else {
        showError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
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

export default useLoginWithEmail;
