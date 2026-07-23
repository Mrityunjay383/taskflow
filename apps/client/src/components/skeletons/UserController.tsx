"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

export function UserControllerSkeleton() {
    const { collapsed } = useSidebar();

    return (
        <div
            className={cn(
                "flex h-14 items-center rounded-lg border border-[#2A3A6A] bg-[#1E2A4A]",
                collapsed ? "justify-center px-0" : "px-3",
            )}
        >
            <Skeleton className="h-8 w-8 shrink-0 rounded-lg bg-slate-600" />

            {!collapsed && (
                <div className="ml-3 flex flex-1 flex-col gap-2">
                    <Skeleton className="h-3 w-24 bg-slate-600" />
                    <Skeleton className="h-2.5 w-32 bg-slate-700" />
                </div>
            )}
        </div>
    );
}
