import { LucideIcon } from "lucide-react";

export type StatCardProps = {
    title: string;
    value: number | string;
    description: string;
    icon: LucideIcon;
    iconClassName?: string;
};

export interface SidebarNavItemProps {
    title: string;
    href: string;
    icon: LucideIcon;
    collapsed: boolean;
}
