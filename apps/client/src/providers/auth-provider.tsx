"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo } from "react";
import { useCurrentUser } from "@/features/auth/auth.queries";
import { AuthContextValue } from "@/lib/types";
import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();

    const query = useCurrentUser();

    const value = useMemo(
        () => ({
            user: query.data ?? null,
            isLoading: query.isPending,
            isAuthenticated: !!query.data,
        }),
        [query],
    );

    useEffect(() => {
        if (!value.isLoading && !value.isAuthenticated) {
            router.replace("/login");
        }
    }, [router, value]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
};
