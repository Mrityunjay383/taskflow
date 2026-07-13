import { Card } from "@/components/ui/card";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Overview</h1>

                <p className="mt-2 text-sm text-slate-400">
                    Welcome back. Here&#39;s what&#39;s happening in your workspace.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {[1, 2, 3, 4].map((item) => (
                    <Card key={item} className="h-36 border-[#1E293B] bg-[#111827]" />
                ))}
            </div>

            <Card className="h-[500px] border-[#1E293B] bg-[#111827]" />
        </div>
    );
}
