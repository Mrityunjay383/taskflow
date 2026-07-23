import { useQuery } from "@tanstack/react-query";

import { checkUserName, getCurrentUser } from "./auth.api";
import { authKeys } from "./auth.keys";
import { getApiError } from "@/helpers/general";
import { usePathname } from "next/navigation";

export const useCurrentUser = () => {
    const pathname = usePathname();

    const enabled = pathname.startsWith("/workspace") || pathname.startsWith("/onboarding");

    return useQuery({
        queryKey: authKeys.me,
        queryFn: getCurrentUser,
        enabled,
        retry: false,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
};

export const useCheckUserName = (userName: string) => {
    const normalized = userName.trim();

    const query = useQuery({
        queryKey: authKeys.checkUserName(normalized),
        queryFn: () =>
            checkUserName({
                userName: normalized,
            }),
        enabled: normalized.length >= 3,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });

    const apiError = getApiError(query.error);

    return {
        available: query.data?.available ?? null,
        isChecking: query.isPending,
        validationError: apiError?.issues?.find((e) => e.path === "userName")?.message ?? null,
        isError: query.isError,
    };
};
