"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import WorkspaceSwitcher from "./WorkspaceSwitcher";
import SidebarNav from "./Nav";
import UserController from "./UserController";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

export default function DashboardSidebar() {
    const { collapsed, toggle } = useSidebar();

    return (
        <aside
            className={cn(
                "flex h-screen flex-col border-r border-[#1E293B] bg-[#0B1120] transition-all duration-300",
                collapsed ? "w-[76px]" : "w-[280px]",
            )}
        >
            <WorkspaceSwitcher />

            <div className="flex-1 overflow-y-auto">
                <SidebarNav />
            </div>

            {/* Footer */}
            <div
                className={cn(
                    "flex items-center gap-2 border-t border-[#1E293B] p-3",
                    collapsed ? "flex-col" : "flex-row",
                )}
            >
                <div className={cn("min-w-0", collapsed ? "w-full" : "flex-1")}>
                    <UserController />
                </div>

                <Button
                    size="icon"
                    variant="ghost"
                    onClick={toggle}
                    className={cn(
                        "cursor-pointer h-14 shrink-0 rounded-xl border border-[#2A3A6A] transition-all duration-200 hover:border-[#3A4A7A] hover:bg-[#1E2A4A]/80 hover:text-white",
                        collapsed ? "w-full" : "w-10",
                    )}
                >
                    {collapsed ? (
                        <PanelLeftOpen className="h-4 w-4" />
                    ) : (
                        <PanelLeftClose className="h-4 w-4" />
                    )}
                </Button>
            </div>
        </aside>
    );
}
