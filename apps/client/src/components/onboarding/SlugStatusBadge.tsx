import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { SlugStatus } from "@/features/workspace/workspace.types";

export default function SlugStatusBadge({ status }: { status: SlugStatus }) {
    if (status === "idle") return null;

    return (
        <div
            className="flex items-center gap-1.5 transition-all duration-300"
            style={{ animation: "fadeSlideIn 0.2s ease both" }}
        >
            {status === "checking" && (
                <>
                    <Loader2 className="h-3 w-3 animate-spin text-slate-400" />
                    <span className="text-xs text-slate-400">Checking availability…</span>
                </>
            )}
            {status === "available" && (
                <>
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    <span className="text-xs text-emerald-400">Available</span>
                </>
            )}
            {status === "taken" && (
                <>
                    <XCircle className="h-3 w-3 text-red-400" />
                    <span className="text-xs text-red-400">Already taken</span>
                </>
            )}
        </div>
    );
}
