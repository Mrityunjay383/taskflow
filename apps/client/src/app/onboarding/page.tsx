"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import { z } from "zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { onboardingSchema } from "@/features/workspace/workspace.schema";
import Wordmark from "@/components/onboarding/Wordmark";
import { SlugStatus } from "@/features/workspace/workspace.types";
import SlugStatusBadge from "@/components/onboarding/SlugStatusBadge";
import { toSlug } from "@/helpers/workspace";

type OnboardingValues = z.infer<typeof onboardingSchema>;

const Onboarding = () => {
    const router = useRouter();
    const [slugStatus, setSlugStatus] = useState<SlugStatus>("idle");
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

    const form = useForm<OnboardingValues>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: { name: "", slug: "" },
        mode: "onChange",
    });

    const watchedName = form.watch("name");
    const watchedSlug = form.watch("slug");

    useEffect(() => {
        if (!slugManuallyEdited) {
            const derived = toSlug(watchedName);
            form.setValue("slug", derived, { shouldValidate: !!derived });
        }
    }, [watchedName, slugManuallyEdited, form]);

    // Debounced slug availability check
    const checkSlug = useCallback((slug: string) => {
        if (!slug || slug.length < 2) {
            setSlugStatus("idle");
            return;
        }
        setSlugStatus("checking");
        // Simulate API check
        const timer = setTimeout(() => {
            const taken = ["taskflow", "marketing", "engineering", "acme-inc"];
            setSlugStatus(taken.includes(slug) ? "taken" : "available");
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const cleanup = checkSlug(watchedSlug);
        return cleanup;
    }, [watchedSlug, checkSlug]);

    const onSubmit = async (values: OnboardingValues) => {
        if (slugStatus === "taken") return;
        // TODO: wire to mutation
        console.log("Creating workspace:", values);
        await new Promise((r) => setTimeout(r, 1200));
        router.push("/dashboard");
    };

    const nameError = form.formState.errors.name?.message;
    const slugError = form.formState.errors.slug?.message;
    const isPending = form.formState.isSubmitting;

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
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-5"
                        >
                            {/* Workspace Name */}
                            <div className="flex flex-col gap-1.5">
                                <Label
                                    htmlFor="name"
                                    className="text-[11px] font-semibold uppercase tracking-wider text-slate-500"
                                >
                                    Workspace name
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="My Workspace"
                                    autoFocus
                                    autoComplete="off"
                                    className={`h-11 rounded-xl border bg-[#0B1120] text-sm text-white placeholder:text-slate-600 transition-all duration-150
                                        focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500/60
                                        ${
                                            nameError
                                                ? "border-red-500/50 focus-visible:ring-red-500/20 focus-visible:border-red-500/60"
                                                : "border-[#1E293B] hover:border-[#2D3F55]"
                                        }`}
                                    {...form.register("name")}
                                />
                                {nameError && <p className="text-xs text-red-400">{nameError}</p>}
                            </div>

                            {/* Workspace Slug */}
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-between">
                                    <Label
                                        htmlFor="slug"
                                        className="text-[11px] font-semibold uppercase tracking-wider text-slate-500"
                                    >
                                        Workspace URL
                                    </Label>
                                    <SlugStatusBadge status={slugStatus} />
                                </div>

                                <div
                                    className="flex items-center rounded-xl border border-[#1E293B] bg-[#0B1120] transition-all duration-150 focus-within:ring-2 focus-within:ring-indigo-500/30 focus-within:border-indigo-500/60 hover:border-[#2D3F55]"
                                    style={slugError ? { borderColor: "rgba(239,68,68,0.5)" } : {}}
                                >
                                    <span className="select-none border-r border-[#1E293B] px-3 py-2.5 text-sm text-slate-600">
                                        taskflow.app/
                                    </span>
                                    <input
                                        id="slug"
                                        placeholder="my-workspace"
                                        autoComplete="off"
                                        className="h-11 flex-1 bg-transparent px-3 text-sm text-white placeholder:text-slate-600 outline-none"
                                        {...form.register("slug", {
                                            onChange: () => setSlugManuallyEdited(true),
                                        })}
                                    />
                                </div>
                                {slugError && <p className="text-xs text-red-400">{slugError}</p>}
                            </div>

                            {/* Submit */}
                            <div className="mt-2 flex flex-col gap-3">
                                <Button
                                    type="submit"
                                    disabled={
                                        isPending ||
                                        slugStatus === "taken" ||
                                        slugStatus === "checking"
                                    }
                                    className="h-11 w-full rounded-xl bg-indigo-500 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(99,102,241,0.3)] transition-all duration-200 hover:bg-indigo-600 hover:shadow-[0_6px_28px_rgba(99,102,241,0.45)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating workspace…
                                        </>
                                    ) : (
                                        <>
                                            Create workspace
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>

                                <p className="text-center text-xs text-slate-600">
                                    You can invite your team after creating your workspace.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
};

export default Onboarding;
