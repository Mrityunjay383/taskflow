import { CheckSquare } from "lucide-react";

export default function LeftPanel({}) {
    return (
        <div className="hidden lg:flex flex-col justify-between flex-1 px-14 py-12 bg-[#0C1220] border-r border-[#1E2A4A] relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute -bottom-32 -left-20 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

            {/* Wordmark */}
            <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                    <CheckSquare className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-white font-bold text-lg tracking-tight">Taskflow</span>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-10 relative">
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold tracking-tighter text-white leading-[1.15]">
                        Every task,{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-indigo-600">
                            exactly where
                        </span>{" "}
                        it should be.
                    </h1>
                    <p className="text-[#4A5580] text-sm leading-relaxed max-w-[300px]">
                        The most advanced task management platform built to move fast.
                    </p>
                </div>

                {/* Task list */}
                <ul className="flex flex-col gap-3">
                    {[
                        { label: "Design system sprint kickoff", done: true },
                        { label: "Review Q3 OKRs with team", done: true },
                        { label: "Finalize API integration docs", done: false },
                        { label: "Ship onboarding flow v2", done: false },
                    ].map((task) => (
                        <li key={task.label} className="flex items-center gap-3">
                            <span
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                    task.done
                                        ? "bg-indigo-500 border-indigo-500"
                                        : "border-[#3A4A7A] bg-transparent"
                                }`}
                            >
                                {task.done && (
                                    <svg
                                        className="w-2.5 h-2.5 text-white"
                                        viewBox="0 0 10 8"
                                        fill="none"
                                    >
                                        <path
                                            d="M1 4l2.5 2.5L9 1"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </span>
                            <span
                                className={`text-sm ${
                                    task.done ? "line-through text-[#3A4A7A]" : "text-[#8B9CC8]"
                                }`}
                            >
                                {task.label}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Stats */}
                <div className="flex gap-8">
                    {[
                        { num: "0M", label: "Tasks shipped" },
                        { num: "0k", label: "Teams worldwide" },
                        { num: "99.9%", label: "Uptime SLA" },
                    ].map((s) => (
                        <div key={s.label} className="flex flex-col gap-0.5">
                            <span className="text-xl font-bold tracking-tight text-white">
                                {s.num}
                            </span>
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#3A4A7A]">
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <p className="text-[#2A3A6A] text-xs italic">
                The interface that finally gets out of your way.
            </p>
        </div>
    );
}
