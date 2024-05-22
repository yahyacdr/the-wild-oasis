import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useDeleteBooking() {
  const qryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success(`Booking successfully deleted`);
      qryClient.invalidateQueries({ queryKey: ["bookings"] });
    },

    onError: () => toast.error("There was an error while deleting"),
  });
  return { mutate, isLoading };
}
