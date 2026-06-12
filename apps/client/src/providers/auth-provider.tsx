"use client";

import { ReactNode, createContext, useContext } from "react";
import { useCurrentUser } from "@/features/auth/auth.queries";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const query = useCurrentUser();

    return <AuthContext.Provider value={query}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
};
