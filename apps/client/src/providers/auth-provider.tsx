"use client";

import { createContext, ReactNode, useContext, useMemo } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { useCurrentUser } from "@/features/auth/auth.queries";
import { authKeys } from "@/features/auth/auth.keys";
import { AuthContextValue } from "@/lib/types";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const query = useCurrentUser();
    const queryClient = useQueryClient();

    const value = useMemo<AuthContextValue>(
        () => ({
            user: query.data ?? null,
            isLoading: query.isPending,
            isAuthenticated: !!query.data,

            setUser: (user) => {
                queryClient.setQueryData(authKeys.me, user);
            },

            clearUser: () => {
                queryClient.removeQueries({
                    queryKey: authKeys.me,
                });
            },
        }),
        [query.data, query.isPending, queryClient],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}
