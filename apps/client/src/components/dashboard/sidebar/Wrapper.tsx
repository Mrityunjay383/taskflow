"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { ReactNode } from "react";

const Wrapper = ({ children }: { children: ReactNode }) => {
    const { collapsed } = useSidebar();

    return (
        <aside
            className={cn(
                "flex h-screen flex-col border-r border-[#1E293B] bg-[#0B1120] transition-all duration-300",
                collapsed ? "w-[76px]" : "w-[260px]",
            )}
        >
            {children}
        </aside>
    );
};

export default Wrapper;
