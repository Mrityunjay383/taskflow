import { useQuery } from "@tanstack/react-query";
import { checkUserName, getCurrentUser } from "./auth.api";
import { getApiError } from "@/helpers/general";

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: getCurrentUser,
        retry: false,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
};

export const useCheckUserName = (userName: string) => {
    const normalized = userName.trim();

    const query = useQuery({
        queryKey: ["check-username", normalized],
        queryFn: () =>
            checkUserName({
                userName: normalized,
            }),
        enabled: normalized.length >= 3,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });

    const apiError = getApiError(query.error);

    const validationError = apiError?.issues?.find((e) => e.path === "userName")?.message ?? null;

    return {
        available: query.data?.available ?? false,
        isChecking: query.isLoading,
        validationError,
    };
};
