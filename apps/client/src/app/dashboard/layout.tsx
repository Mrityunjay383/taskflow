import type { Metadata } from "next";
import { ReactNode } from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import DashboardSidebar from "@/components/dashboard/sidebar";
import { AuthProvider } from "@/providers/auth-provider";

export const metadata: Metadata = {
    title: "Dashboard | Taskflow",
    description: "",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <AuthGuard>
                <div className="flex h-screen bg-[#080B14]">
                    <DashboardSidebar />

                    <main className="flex-1 overflow-y-auto">
                        <div className="mx-auto w-full max-w-7xl p-8">{children}</div>
                    </main>
                </div>
            </AuthGuard>
        </AuthProvider>
    );
}
