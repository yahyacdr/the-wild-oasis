import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export default function useEditSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    // accepts only one arg ↓
    mutationFn: updateSettingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
      toast.success("Cabin successfully edit");
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateSetting, isUpdating };
}
