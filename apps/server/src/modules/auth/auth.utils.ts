export const currentUserSelect = {
    id: true,
    userName: true,
    email: true,
    password: true,
    ownedWorkspaces: {
        select: { id: true },
        take: 1,
    },
    workspaceMemberships: {
        select: { id: true },
        take: 1,
    },
} as const;

export const toCurrentUser = (user: {
    id: string;
    userName: string;
    email: string;
    ownedWorkspaces: { id: string }[];
    workspaceMemberships: { id: string }[];
}) => ({
    id: user.id,
    userName: user.userName,
    email: user.email,
    onboardingRequired: user.ownedWorkspaces.length === 0 && user.workspaceMemberships.length === 0,
});
