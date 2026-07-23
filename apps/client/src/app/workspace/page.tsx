import { Card } from "@/components/ui/card";
import OverviewStats from "@/components/dashboard/overview/stats";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Overview</h1>

                <p className="mt-2 text-sm text-slate-400">
                    Welcome back. Here&#39;s what&#39;s happening in your workspace.
                </p>
            </div>

            <OverviewStats members={18} projects={0} tasks={342} dueToday={0} />

            <Card className="h-[500px] border-[#1E293B] bg-[#111827]" />
        </div>
    );
}
