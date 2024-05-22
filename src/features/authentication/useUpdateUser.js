import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    // accepts only one arg ↓
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User data successfully updated");
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateUser, isUpdating };
}
