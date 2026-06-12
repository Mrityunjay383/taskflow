"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginFormValues } from "@/features/auth/auth.schema";
import { useLoginMutation } from "@/features/auth/auth.mutations";
import Link from "next/link";

import { CheckSquare, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function RightPanel({}) {
    const router = useRouter();
    const loginMutation = useLoginMutation();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (values: LoginFormValues) => {
        try {
            await loginMutation.mutateAsync(values);
            router.push("/dashboard");
        } catch (error) {
            console.error(error);
        }
    };

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
                    <h2 className="text-2xl font-bold tracking-tight text-white">Welcome back</h2>
                    <p className="text-sm text-[#4A5580]">Sign in to your workspace</p>
                </div>

                {/* Form */}
                <form
                    onSubmit={form.handleSubmit(onSubmit, (e) => console.log("Errors", e))}
                    className="flex flex-col gap-5"
                >
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
                        <div className="flex items-center justify-between">
                            <Label
                                htmlFor="password"
                                className="text-[11px] font-semibold uppercase tracking-wider text-[#4A5580]"
                            >
                                Password
                            </Label>
                            <a
                                href="/forgot-password"
                                className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                Forgot password?
                            </a>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
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
                        disabled={loginMutation.isPending}
                        className="w-full h-11 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-[0_4px_20px_rgba(99,102,241,0.35)] hover:shadow-[0_6px_24px_rgba(99,102,241,0.5)] transition-all mt-1"
                    >
                        {loginMutation.isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Signing in…
                            </>
                        ) : (
                            "Sign in"
                        )}
                    </Button>
                </form>

                {/* SSO */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-[#2A3A6A] text-xs">
                        <Separator className="flex-1 bg-[#1E2A4A]" />
                        or
                        <Separator className="flex-1 bg-[#1E2A4A]" />
                    </div>
                </div>

                <p className="text-center text-sm text-[#4A5580]">
                    Don&#39;t have an account?{" "}
                    <Link
                        href="/register"
                        className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
                    >
                        Create workspace
                    </Link>
                </p>
            </div>
        </div>
    );
}
