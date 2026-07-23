"use client";

import { LayoutDashboard, CheckSquare2 } from "lucide-react";

import SidebarNavItem from "./NavItem";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

const navigation = [
    {
        title: "Overview",
        href: "/workspace",
        icon: LayoutDashboard,
    },
    {
        title: "Tasks",
        href: "/workspace/tasks",
        icon: CheckSquare2,
    },
];

export default function SidebarNav() {
    const { collapsed } = useSidebar();

    return (
        <div className={cn("space-y-1", collapsed ? "p-2" : "p-3")}>
            {navigation.map((item) => (
                <SidebarNavItem key={item.href} {...item} collapsed={collapsed} />
            ))}
        </div>
    );
}
