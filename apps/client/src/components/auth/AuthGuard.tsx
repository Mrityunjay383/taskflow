"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/providers/auth-provider";
import AuthGuardLoader from "@/components/auth/Loading";

export default function AuthGuard({ children }: { children: ReactNode }) {
    const { isLoading, isAuthenticated } = useAuth();

    if (isLoading) {
        return <AuthGuardLoader />;
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
