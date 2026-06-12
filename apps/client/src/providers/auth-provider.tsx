"use client";

import { createContext, useContext } from "react";
import { useCurrentUser } from "@/features/auth/auth.queries";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
    const query = useCurrentUser();

    const value = {
        user: query.data ?? null,
        isLoading: query.isLoading,
        isAuthenticated: !!query.data,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
