"use client";

import { LayoutDashboard, CheckSquare2 } from "lucide-react";

import SidebarNavItem from "./NavItem";

const navigation = [
    {
        title: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Tasks",
        href: "/dashboard/tasks",
        icon: CheckSquare2,
    },
];

export default function SidebarNav() {
    return (
        <div className="flex h-full flex-col">
            <div className="space-y-1 p-3">
                {navigation.map((item) => (
                    <SidebarNavItem key={item.href} {...item} />
                ))}
            </div>
        </div>
    );
}
