"use client";

import { createContext, ReactNode, useContext, useMemo } from "react";
import { useCurrentUser } from "@/features/auth/auth.queries";
import { AuthContextValue } from "@/lib/types";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const query = useCurrentUser();

    const value = useMemo<AuthContextValue>(
        () => ({
            user: query.data ?? null,
            isLoading: query.isPending,
            isAuthenticated: !!query.data,
        }),
        [query.data, query.isPending],
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
