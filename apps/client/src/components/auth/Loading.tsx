import { Loader2, CheckSquare } from "lucide-react";
import Wordmark from "@/components/common/Wordmark";

export default function AuthGuardLoader() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#080B14] flex items-center justify-center px-6">
            {/* Ambient background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-48 -left-48 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-3xl" />

                <div className="absolute -bottom-48 -right-48 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative flex flex-col items-center gap-8">
                {/* Logo */}
                <Wordmark />

                {/* Spinner */}
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />

                    <div className="text-center">
                        <p className="text-white font-medium">Checking your session</p>

                        <p className="mt-1 text-sm text-[#5D6B92]">
                            Please wait while we securely verify your account.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
