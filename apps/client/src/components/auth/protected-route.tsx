"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { data, isLoading, isError } = useAuth();

    useEffect(() => {
        if (!isLoading && (isError || !data)) {
            router.replace("/login");
        }
    }, [isLoading, isError, data, router]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return null;
    }

    return <>{children}</>;
}
