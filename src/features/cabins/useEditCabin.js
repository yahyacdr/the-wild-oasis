import { createEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    // accepts only one arg ↓
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
      toast.success("Cabin successfully edit");
    },
    onError: (err) => toast.error(err.message),
  });
  return { editCabin, isEditing };
}
