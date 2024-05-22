import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogin() {
  const qryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading: isLogin } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      qryClient.setQueryData(["user"], user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or passowrd are incorrect");
    },
  });

  return { login, isLogin };
}
