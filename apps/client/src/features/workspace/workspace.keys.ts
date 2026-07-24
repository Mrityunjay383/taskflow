export const workspaceKeys = {
    all: ["workspace"] as const,

    list: () => [...workspaceKeys.all, "list"] as const,

    current: () => [...workspaceKeys.all, "current"] as const,

    members: (workspaceId: string) => [...workspaceKeys.all, workspaceId, "members"] as const,

    checkSlug: (slug: string) => [...workspaceKeys.all, "check-slug", slug] as const,

    stats: (workspaceId: string | null) => [...workspaceKeys.all, "stats", workspaceId] as const,
};
