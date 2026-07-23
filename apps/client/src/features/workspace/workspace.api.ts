import { api } from "@/lib/api";
import { ApiResponse } from "@/lib/types";
import {
    CheckSlug,
    CheckSlugPayload,
    CreateWorkspace,
    CreateWorkspacePayload,
    Workspace,
    WorkspaceStats,
    WorkspaceStatsPayload,
} from "@/features/workspace/workspace.types";

export const checkSlug = async (payload: CheckSlugPayload): Promise<CheckSlug> => {
    const response = await api.get<ApiResponse<CheckSlug>>("/workspace/check-slug", {
        params: payload,
    });

    return response.data.data!;
};

export const getWorkspaces = async (): Promise<Workspace[]> => {
    const response = await api.get<ApiResponse<Workspace[]>>("/workspace");

    return response.data.data!;
};

export const createWorkspace = async (
    payload: CreateWorkspacePayload,
): Promise<CreateWorkspace> => {
    const response = await api.post<ApiResponse<CreateWorkspace>>("/workspace", payload);

    return response.data.data!;
};

export const getWorkspaceStats = async (
    payload: WorkspaceStatsPayload,
): Promise<WorkspaceStats> => {
    const response = await api.get<ApiResponse<WorkspaceStats>>("/workspace/stats", {
        params: payload,
    });

    return response.data.data!;
};
