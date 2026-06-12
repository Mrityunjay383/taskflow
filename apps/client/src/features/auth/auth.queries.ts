import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "./auth.api";

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: getCurrentUser,
        retry: false,
    });
};
