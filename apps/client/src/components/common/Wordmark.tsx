import { CheckSquare } from "lucide-react";

export default function Wordmark() {
    return (
        <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
                <CheckSquare className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Taskflow</span>
        </div>
    );
}
