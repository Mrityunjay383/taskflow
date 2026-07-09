"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/providers/auth-provider";
import AuthGuardLoader from "@/components/partials/auth/Loading";

export default function AuthGuard({ children }: { children: ReactNode }) {
    const router = useRouter();

    const { isLoading, isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.replace("/login");
        }
    }, [isLoading, isAuthenticated, router]);

    if (!isLoading) {
        return <AuthGuardLoader />;
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
