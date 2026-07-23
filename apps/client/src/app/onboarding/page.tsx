import AuthGuard from "@/components/auth/AuthGuard";

import Wordmark from "@/components/common/Wordmark";
import CreateWorkspace from "@/components/common/CreateWorkspace";

const Onboarding = () => {
    return (
        <AuthGuard>
            {/* Page shell */}
            <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#080B14] px-4 py-16 overflow-hidden">
                {/* Atmospheric glow — the signature element */}
                <div
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    aria-hidden
                >
                    <div className="h-[520px] w-[520px] rounded-full bg-indigo-600/10 blur-[100px]" />
                </div>
                <div
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    aria-hidden
                >
                    <div className="h-[240px] w-[240px] rounded-full bg-indigo-500/8 blur-[60px]" />
                </div>

                {/* Wordmark */}
                <div className="mb-10">
                    <Wordmark />
                </div>

                {/* Card */}
                <div className="relative w-full max-w-[480px]">
                    <div className="rounded-2xl border border-[#1E293B] bg-[#0F172A] p-8 shadow-[0_0_0_1px_rgba(99,102,241,0.04),0_32px_64px_rgba(0,0,0,0.4)]">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-[26px] font-bold tracking-tight text-white">
                                Welcome to Taskflow 👋
                            </h1>
                            <p className="mt-2 text-sm leading-relaxed text-slate-400">
                                Let&#39;s create your first workspace to get started.
                            </p>
                        </div>

                        {/* Form */}
                        <CreateWorkspace />
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
};

export default Onboarding;
