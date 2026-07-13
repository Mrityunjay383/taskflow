"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { SidebarNavItemProps } from "@/components/dashboard/sidebar/types";

export default function SidebarNavItem({ title, href, icon: Icon }: SidebarNavItemProps) {
    const pathname = usePathname();

    const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

    return (
        <Link
            href={href}
            className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200",
                active
                    ? "bg-indigo-500/15 text-indigo-400"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-white",
            )}
        >
            <Icon
                className={cn(
                    "h-5 w-5",
                    active ? "text-indigo-400" : "text-slate-500 group-hover:text-white",
                )}
            />

            <span className="text-sm font-medium">{title}</span>
        </Link>
    );
}
