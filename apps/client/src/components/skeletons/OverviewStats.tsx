import { Skeleton } from "@/components/ui/skeleton";

function StatCardSkeleton() {
    return (
        <div className="rounded-xl border border-[#1E293B] bg-[#0B1120] p-5">
            <div className="flex items-start justify-between">
                <div className="space-y-3">
                    <Skeleton className="h-4 w-24 bg-slate-700" />

                    <Skeleton className="h-9 w-16 bg-slate-700" />

                    <Skeleton className="h-3 w-36 bg-slate-800" />
                </div>

                <Skeleton className="h-11 w-11 rounded-xl bg-slate-700" />
            </div>
        </div>
    );
}

export default function OverviewStatsSkeleton() {
    return (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
        </section>
    );
}
