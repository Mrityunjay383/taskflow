import { useQuery } from "@tanstack/react-query";

import { checkSlug, getWorkspaces } from "./workspace.api";
import { workspaceKeys } from "./workspace.keys";
import { getApiError } from "@/helpers/general";

export const useCheckWorkspaceSlug = (slug: string) => {
    const normalized = slug.trim().toLowerCase();

    const query = useQuery({
        queryKey: workspaceKeys.checkSlug(normalized),
        queryFn: () =>
            checkSlug({
                slug: normalized,
            }),
        enabled: normalized.length >= 3,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });

    const apiError = getApiError(query.error);

    return {
        available: query.data?.available ?? null,
        isChecking: query.isPending,
        validationError: apiError?.issues?.find((e) => e.path === "slug")?.message ?? null,
        isError: query.isError,
    };
};

export const useWorkspaces = () => {
    return useQuery({
        queryKey: workspaceKeys.list(),
        queryFn: getWorkspaces,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
};
