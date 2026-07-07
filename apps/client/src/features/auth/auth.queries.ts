import { useQuery } from "@tanstack/react-query";
import { checkUserName, getCurrentUser } from "./auth.api";

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: getCurrentUser,
        retry: false,
    });
};

export const useCheckUserName = (userName: string) => {
    const normalized = userName.trim();

    return useQuery({
        queryKey: ["check-username", normalized],
        queryFn: () =>
            checkUserName({
                userName: normalized,
            }),
        enabled: normalized.length >= 3,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });
};
