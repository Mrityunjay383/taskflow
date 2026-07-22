import { Skeleton } from "@/components/ui/skeleton";

export function WorkspaceSwitcherSkeleton() {
    return (
        <div className="border-b border-[#1E293B] p-4">
            <Skeleton className="h-14 w-full rounded-xl" />
        </div>
    );
}
