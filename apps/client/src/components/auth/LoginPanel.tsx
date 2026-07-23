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
import { getApiError } from "@/helpers/general";

export default function LoginPanel({}) {
    const router = useRouter();
    const loginMutation = useLoginMutation();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { identifier: "", password: "" },
    });

    const onSubmit = async (values: LoginFormValues) => {
        try {
            const res = await loginMutation.mutateAsync(values);

            if (res?.onboardingRequired) {
                router.replace("/onboarding");
            } else {
                router.replace("/workspace");
            }
        } catch (error) {
            const apiError = getApiError(error);

            const { message, errorCode } = apiError;

            switch (errorCode) {
                case "INVALID_CREDS":
                    form.setError("identifier", {
                        type: "server",
                        message,
                    });

                    form.setError("password", {
                        type: "server",
                        message,
                    });

                    break;

                default:
                    console.error(error);
            }
        }
    };

    const identifierError = form.formState.errors.identifier?.message;
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
                            htmlFor="identifier"
                            className="text-[11px] font-semibold uppercase tracking-wider text-[#4A5580]"
                        >
                            Email / UserName
                        </Label>
                        <Input
                            id="identifier"
                            type="text"
                            placeholder="Email or username"
                            className={`bg-[#1E2A4A] border-[#2A3A6A] text-white placeholder:text-[#3A4A7A] focus-visible:ring-indigo-500/40 focus-visible:border-indigo-500 h-11 rounded-lg ${
                                identifierError ? "border-red-500 focus-visible:border-red-500" : ""
                            }`}
                            {...form.register("identifier")}
                        />
                        {identifierError && (
                            <p className="text-xs text-red-400 font-medium">{identifierError}</p>
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
                            <Link
                                href="/forgot-password"
                                tabIndex={-1}
                                className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                Forgot password?
                            </Link>
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
                        className="w-full h-11 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg cursor-pointer shadow-[0_4px_20px_rgba(99,102,241,0.35)] hover:shadow-[0_6px_24px_rgba(99,102,241,0.5)] transition-all mt-1"
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
                        Create
                    </Link>
                </p>
            </div>
        </div>
    );
}
