"use client";

import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import UserController from "@/components/dashboard/sidebar/UserController";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

const Footer = () => {
    const { collapsed, toggle } = useSidebar();

    return (
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
    );
};

export default Footer;
