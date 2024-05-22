import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useCheckout() {
  const qryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-out" }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      qryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => toast.error("There was an error while checking in"),
  });
  return { checkout, isCheckingOut };
}
