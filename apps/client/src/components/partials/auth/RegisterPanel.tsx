"use client";

import { CheckSquare, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RegisterFormValues, registerSchema } from "@/features/auth/auth.schema";
import { useRegisterMutation } from "@/features/auth/auth.mutations";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const RegisterPanel = () => {
    const router = useRouter();
    const registerMutation = useRegisterMutation();

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: { userName: "", email: "", password: "" },
    });

    const onSubmit = async (values: RegisterFormValues) => {
        try {
            await registerMutation.mutateAsync(values);
            router.push("/dashboard");
        } catch (error) {
            console.error(error);
        }
    };

    const nameError = form.formState.errors.userName?.message;
    const emailError = form.formState.errors.email?.message;
    const passwordError = form.formState.errors.password?.message;

    return (
        <div className="flex-1 lg:flex-none lg:w-[460px] flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-[360px] flex flex-col gap-8">
                {/* Mobile wordmark */}
                <div className="flex lg:hidden items-center gap-2.5">
                    <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                        <CheckSquare className="w-4 h-4 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-white font-bold text-lg tracking-tight">Taskflow</span>
                </div>

                {/* Header */}
                <div className="flex flex-col gap-1.5">
                    <h2 className="text-2xl font-bold tracking-tight text-white">
                        Create your workspace
                    </h2>
                    <p className="text-sm text-[#4A5580]">Free forever. No credit card required.</p>
                </div>

                {/* Form */}
                <form
                    onSubmit={form.handleSubmit(onSubmit, (e) => console.log("Errors", e))}
                    className="flex flex-col gap-5"
                >
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                        <Label
                            htmlFor="name"
                            className="text-[11px] font-semibold uppercase tracking-wider text-[#4A5580]"
                        >
                            Choose UserName
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Alex Johnson"
                            className={`bg-[#1E2A4A] border-[#2A3A6A] text-white placeholder:text-[#3A4A7A] focus-visible:ring-indigo-500/40 focus-visible:border-indigo-500 h-11 rounded-lg ${
                                nameError ? "border-red-500 focus-visible:border-red-500" : ""
                            }`}
                            {...form.register("userName")}
                        />
                        {nameError && (
                            <p className="text-xs text-red-400 font-medium">{nameError}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                        <Label
                            htmlFor="email"
                            className="text-[11px] font-semibold uppercase tracking-wider text-[#4A5580]"
                        >
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@company.com"
                            className={`bg-[#1E2A4A] border-[#2A3A6A] text-white placeholder:text-[#3A4A7A] focus-visible:ring-indigo-500/40 focus-visible:border-indigo-500 h-11 rounded-lg ${
                                emailError ? "border-red-500 focus-visible:border-red-500" : ""
                            }`}
                            {...form.register("email")}
                        />
                        {emailError && (
                            <p className="text-xs text-red-400 font-medium">{emailError}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1.5">
                        <Label
                            htmlFor="password"
                            className="text-[11px] font-semibold uppercase tracking-wider text-[#4A5580]"
                        >
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Min. 8 characters"
                            className={`bg-[#1E2A4A] border-[#2A3A6A] text-white placeholder:text-[#3A4A7A] focus-visible:ring-indigo-500/40 focus-visible:border-indigo-500 h-11 rounded-lg ${
                                passwordError ? "border-red-500 focus-visible:border-red-500" : ""
                            }`}
                            {...form.register("password")}
                        />
                        {passwordError && (
                            <p className="text-xs text-red-400 font-medium">{passwordError}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={registerMutation.isPending}
                        className="w-full h-11 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-[0_4px_20px_rgba(99,102,241,0.35)] hover:shadow-[0_6px_24px_rgba(99,102,241,0.5)] transition-all mt-1"
                    >
                        {registerMutation.isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Creating workspace…
                            </>
                        ) : (
                            "Create workspace"
                        )}
                    </Button>

                    <p className="text-[10px] text-[#3A4A7A] text-center leading-relaxed">
                        By creating an account you agree to our{" "}
                        <Link
                            href="/terms"
                            className="text-indigo-500 hover:text-indigo-400 transition-colors"
                        >
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="/privacy"
                            className="text-indigo-500 hover:text-indigo-400 transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </form>

                {/* SSO */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-[#2A3A6A] text-xs">
                        <Separator className="flex-1 bg-[#1E2A4A]" />
                        or
                        <Separator className="flex-1 bg-[#1E2A4A]" />
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full h-11 bg-transparent border-[#2A3A6A] text-[#8B9CC8] hover:border-[#3A4A7A] hover:text-white hover:bg-transparent rounded-lg gap-2"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M15.68 8.18c0-.57-.05-1.12-.14-1.64H8v3.1h4.3a3.68 3.68 0 01-1.6 2.41v2h2.58c1.51-1.39 2.4-3.44 2.4-5.87z"
                                fill="#4285F4"
                            />
                            <path
                                d="M8 16c2.16 0 3.97-.71 5.3-1.94l-2.58-2a4.78 4.78 0 01-2.72.76c-2.09 0-3.86-1.41-4.5-3.31H.84v2.07A8 8 0 008 16z"
                                fill="#34A853"
                            />
                            <path
                                d="M3.5 9.51A4.82 4.82 0 013.25 8c0-.53.09-1.04.25-1.51V4.42H.84A8 8 0 000 8c0 1.29.31 2.51.84 3.58l2.66-2.07z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M8 3.18c1.18 0 2.24.4 3.07 1.2l2.3-2.3A8 8 0 00.84 4.42L3.5 6.49C4.14 4.59 5.91 3.18 8 3.18z"
                                fill="#EA4335"
                            />
                        </svg>
                        Sign up with Google
                    </Button>
                </div>

                <p className="text-center text-sm text-[#4A5580]">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPanel;
