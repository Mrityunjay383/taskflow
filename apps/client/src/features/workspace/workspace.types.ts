export type CheckSlugPayload = {
    slug: string;
};

export type CheckSlug = {
    available: boolean;
};

export type WorkspaceStatsPayload = {
    workspaceId: string;
};

export type WorkspaceStats = {
    members: number;
    projects: number;
    tasks: number;
    dueToday: number;
};

export type WorkspaceRole = "OWNER" | "MANAGER" | "MEMBER";

export interface Workspace {
    id: string;
    name: string;
    slug: string;
    role: WorkspaceRole;
}

export type CreateWorkspacePayload = {
    name: string;
    slug: string;
};

export type CreateWorkspace = {
    id: string;
    name: string;
    slug: string;
};
