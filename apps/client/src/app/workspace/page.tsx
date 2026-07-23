import { Card } from "@/components/ui/card";
import OverviewStats from "@/components/dashboard/overview/stats";
import TopBar from "@/components/common/TopBar";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <TopBar
                head="Overview"
                subhead="Welcome back. Here&#39;s what&#39;s happening in your workspace."
            />

            <OverviewStats />

            <Card className="h-[500px] border-[#1E293B] bg-[#111827]" />
        </div>
    );
}
