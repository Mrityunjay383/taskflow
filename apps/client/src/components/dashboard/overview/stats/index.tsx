"use client";

import { Users, FolderKanban, CheckSquare, TrendingUp } from "lucide-react";
import StatCard from "./StatCard";
import OverviewStatsSkeleton from "@/components/skeletons/OverviewStats";
import { useWorkspaceStats } from "@/features/workspace/workspace.queries";

export default function OverviewStats({}) {
    const { data: workspaceStats, isLoading } = useWorkspaceStats();

    if (isLoading) {
        return <OverviewStatsSkeleton />;
    }

    if (!workspaceStats) {
        return null;
    }

    return (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
                title="Members"
                value={workspaceStats.members}
                description="Total workspace members"
                icon={Users}
            />

            <StatCard
                title="Projects"
                value={workspaceStats.projects}
                description="Projects in this workspace"
                icon={FolderKanban}
            />

            <StatCard
                title="Tasks"
                value={workspaceStats.tasks}
                description="Total tasks created"
                icon={CheckSquare}
            />

            <StatCard
                title="Due today"
                value={`${workspaceStats.dueToday}`}
                description="Tasks due for today"
                icon={TrendingUp}
            />
        </section>
    );
}
