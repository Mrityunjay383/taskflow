import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/auth.api";

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            const res = await getCurrentUser();
            return res.data.data;
        },
        retry: false,
    });
};
