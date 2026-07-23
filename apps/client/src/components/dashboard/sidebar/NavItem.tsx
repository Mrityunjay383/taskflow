"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { SidebarNavItemProps } from "@/components/dashboard/sidebar/types";

export default function SidebarNavItem({
    title,
    href,
    icon: Icon,
    collapsed,
}: SidebarNavItemProps) {
    const pathname = usePathname();

    const active = pathname === href || (href !== "/workspace" && pathname.startsWith(href));

    return (
        <Link
            href={href}
            className={cn(
                "group flex items-center rounded-xl transition-all duration-200",
                collapsed ? "justify-center p-3" : "gap-3 px-3 py-2.5",
                active
                    ? "bg-indigo-500/15 text-indigo-400"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-white",
            )}
        >
            <Icon
                className={cn(
                    "h-5 w-5 shrink-0",
                    active ? "text-indigo-400" : "text-slate-500 group-hover:text-white",
                )}
            />

            <span
                className={cn(
                    "overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-200",
                    collapsed ? "w-0 opacity-0" : "w-auto opacity-100",
                )}
            >
                {title}
            </span>
        </Link>
    );
}
