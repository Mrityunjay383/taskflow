"use client";

import { toSlug } from "@/helpers/workspace";
import { useDebounce } from "@/hooks/useDebounce";
import { useCheckWorkspaceSlug } from "@/features/workspace/workspace.queries";
import { z } from "zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { onboardingSchema } from "@/features/workspace/workspace.schema";

type OnboardingValues = z.infer<typeof onboardingSchema>;

const CreateWorkspace = () => {
    const router = useRouter();
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

    const debounceSlug = useDebounce(watchedSlug, 500);

    const { available, isChecking, validationError, isError } = useCheckWorkspaceSlug(debounceSlug);

    useEffect(() => {
        if (watchedSlug.trim().length <= 3) {
            form.clearErrors("slug");
            return;
        }

        if (validationError) {
            form.setError("slug", {
                type: "server",
                message: validationError,
            });

            return;
        }

        if (!isChecking) {
            if (available === true) {
                form.clearErrors("slug");
            }

            if (available === false) {
                form.setError("slug", {
                    type: "server",
                    message: "Already taken, use something else",
                });
            }
        }

        if (isError) {
            form.setError("slug", {
                type: "server",
                message: "Something went wrong",
            });
        }
    }, [available, validationError, isChecking, watchedSlug, form, isError]);

    const onSubmit = async (values: OnboardingValues) => {
        if (available === false) {
            form.setError("slug", {
                type: "manual",
                message: "Already taken, use something else",
            });

            return;
        }

        // TODO: wire to mutation
        console.log("Creating workspace:", values);
        await new Promise((r) => setTimeout(r, 1200));
        router.push("/dashboard");
    };

    const nameError = form.formState.errors.name?.message;
    const slugError = form.formState.errors.slug?.message;
    const isPending = form.formState.isSubmitting;

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
                    className={`h-11 rounded-xl border bg-[#0B1120] text-sm text-white placeholder:text-slate-600 transition-all duration-150 focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500/60 ${
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
                    disabled={isPending}
                    className="h-11 w-full rounded-xl cursor-pointer bg-indigo-500 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(99,102,241,0.3)] transition-all duration-200 hover:bg-indigo-600 hover:shadow-[0_6px_28px_rgba(99,102,241,0.45)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
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
    );
};

export default CreateWorkspace;
