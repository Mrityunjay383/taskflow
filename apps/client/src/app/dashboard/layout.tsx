import type { Metadata } from "next";
import { ReactNode } from "react";
import AuthGuard from "@/components/auth/AuthGuard";

export const metadata: Metadata = {
    title: "Dashboard | Taskflow",
    description: "",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return <AuthGuard>{children}</AuthGuard>;
}
