import { CheckSquare } from "lucide-react";

export default function Wordmark() {
    return (
        <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
                <CheckSquare className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-base font-bold tracking-tight text-white">Taskflow</span>
        </div>
    );
}
