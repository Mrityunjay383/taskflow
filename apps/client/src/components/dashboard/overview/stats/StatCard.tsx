import { cn } from "@/lib/utils";
import { StatCardProps } from "@/components/dashboard/overview/types";

export default function StatCard({
    title,
    value,
    description,
    icon: Icon,
    iconClassName,
}: StatCardProps) {
    return (
        <div className="rounded-xl border border-[#1E293B] bg-[#0B1120] p-5">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-slate-400">{title}</p>

                    <h2 className="mt-2 text-3xl font-bold tracking-tight">{value}</h2>

                    <p className="mt-2 text-xs text-slate-500">{description}</p>
                </div>

                <div
                    className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10",
                        iconClassName,
                    )}
                >
                    <Icon className="h-5 w-5 text-indigo-400" />
                </div>
            </div>
        </div>
    );
}
