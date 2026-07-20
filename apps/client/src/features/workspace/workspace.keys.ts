export const workspaceKeys = {
    all: ["workspace"] as const,

    checkSlug: (slug: string) => ["workspace", "check-slug", slug] as const,
};
