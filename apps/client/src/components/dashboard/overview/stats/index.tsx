import { Users, FolderKanban, CheckSquare, TrendingUp } from "lucide-react";

import StatCard from "./StatCard";
import { OverviewStatsProps } from "@/components/dashboard/overview/types";
import OverviewStatsSkeleton from "@/components/skeletons/OverviewStats";

export default function OverviewStats({ members, projects, tasks, dueToday }: OverviewStatsProps) {
    // if (true) {
    //     return <OverviewStatsSkeleton />;
    // }

    return (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
                title="Members"
                value={members}
                description="Total workspace members"
                icon={Users}
            />

            <StatCard
                title="Projects"
                value={projects}
                description="Projects in this workspace"
                icon={FolderKanban}
            />

            <StatCard
                title="Tasks"
                value={tasks}
                description="Total tasks created"
                icon={CheckSquare}
            />

            <StatCard
                title="Due today"
                value={`${dueToday}`}
                description="Tasks due for today"
                icon={TrendingUp}
            />
        </section>
    );
}
