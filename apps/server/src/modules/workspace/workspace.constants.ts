export const InviteIdentifier = {
    EMAIL: "EMAIL",
    USERNAME: "USERNAME",
};

export const WorkspaceUserRoleObj = {
    OWNER: "OWNER",
    MANAGER: "MANAGER",
    MEMBER: "MEMBER",
} as const;

export const MESSAGES = {
    SLUG: {
        MIN: "Slug must be at least 3 characters.",
        MAX: "Slug cannot exceed 50 characters.",
        REGEX: "Slug can only contain lowercase letters, numbers and hyphens.",
    },
    NAME: {
        MIN: "Workspace name must be at least 3 characters.",
        MAX: "Workspace name cannot exceed 100 characters.",
    },
};
