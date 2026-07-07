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
    return useQuery({
        queryKey: ["check-username", userName],
        queryFn: () => checkUserName({ userName }),
        enabled: userName.trim().length >= 3,
        retry: false,
    });
};
