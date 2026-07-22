export const authKeys = {
    me: ["me"] as const,
    checkUserName: (userName: string) => ["check-username", userName] as const,
};
