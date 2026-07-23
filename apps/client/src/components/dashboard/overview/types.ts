import { LucideIcon } from "lucide-react";

export type StatCardProps = {
    title: string;
    value: number | string;
    description: string;
    icon: LucideIcon;
    iconClassName?: string;
};

export type OverviewStatsProps = {
    members: number;
    projects: number;
    tasks: number;
    dueToday: number;
};
