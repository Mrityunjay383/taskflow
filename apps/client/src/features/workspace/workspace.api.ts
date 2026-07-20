import { api } from "@/lib/api";
import { ApiResponse } from "@/lib/types";
import { CheckSlug, CheckSlugPayload } from "@/features/workspace/workspace.types";

export const checkSlug = async (payload: CheckSlugPayload): Promise<CheckSlug> => {
    const response = await api.get<ApiResponse<CheckSlug>>("/workspace/check-slug", {
        params: payload,
    });

    return response.data.data!;
};
