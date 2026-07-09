"use client";

import { createContext, ReactNode, useContext, useMemo } from "react";
import { useCurrentUser } from "@/features/auth/auth.queries";
import { AuthContextValue } from "@/lib/types";

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const query = useCurrentUser();

    const value = useMemo(
        () => ({
            user: query.data ?? null,
            isLoading: query.isLoading,
            isAuthenticated: query.data !== null,
        }),
        [query.data, query.isLoading],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
};
