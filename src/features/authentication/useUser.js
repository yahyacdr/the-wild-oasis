import { useQuery } from "@tanstack/react-query";
import { getCurrUser } from "../../services/apiAuth";

export default function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrUser,
  });

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
