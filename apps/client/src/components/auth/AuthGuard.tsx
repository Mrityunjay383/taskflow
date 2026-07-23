"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/providers/auth-provider";
import AuthGuardLoader from "@/components/auth/Loading";

export default function AuthGuard({ children }: { children: ReactNode }) {
    const router = useRouter();

    const { isLoading, isAuthenticated, user } = useAuth();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.replace("/login");
        }

        if (!isLoading && isAuthenticated) {
            if (user?.onboardingRequired) {
                router.replace("/onboarding");
            } else {
                router.replace("/workspace");
            }
        }
    }, [isLoading, isAuthenticated, router, user?.onboardingRequired]);

    if (isLoading) {
        return <AuthGuardLoader />;
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
