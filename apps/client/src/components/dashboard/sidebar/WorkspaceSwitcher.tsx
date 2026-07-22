"use client";

import { Check, ChevronDown, Plus } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { WorkspaceSwitcherSkeleton } from "@/components/skeletons/WorkspaceSwitcher";

import { useCurrentWorkspace } from "@/hooks/useCurrentWorkspace";
import { cn } from "@/lib/utils";

export default function WorkspaceSwitcher() {
    const { workspaces, currentWorkspace, switchWorkspace, isLoading, isError, refetch } =
        useCurrentWorkspace();

    if (isLoading) {
        return <WorkspaceSwitcherSkeleton />;
    }

    if (isError) {
        return (
            <div className="border-b border-[#1E293B] p-4">
                <Button variant="outline" className="w-full" onClick={() => refetch()}>
                    Retry
                </Button>
            </div>
        );
    }

    if (!currentWorkspace) {
        return null;
    }

    return (
        <div className="border-b border-[#1E293B] p-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="group h-14 w-full justify-between border border-[#2A3A6A] bg-[#1E2A4A] px-3 hover:bg-[#1E2A4A]/80 hover:border-[#3A4A7A]"
                    >
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-sm font-bold shadow-lg shadow-indigo-500/20">
                                {currentWorkspace.name[0].toUpperCase()}
                            </div>

                            <div className="min-w-0 flex flex-col items-start">
                                <span className="truncate text-sm font-semibold">
                                    {currentWorkspace.name}
                                </span>

                                <span className="truncate text-xs capitalize text-[#4A5580]">
                                    {currentWorkspace.role.toLowerCase()}
                                </span>
                            </div>
                        </div>

                        <ChevronDown className="h-4 w-4 shrink-0 text-[#4A5580] group-data-[state=open]:rotate-180 group-data-[state=open]:text-indigo-400" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="start"
                    sideOffset={8}
                    className="w-[260px] rounded-xl border border-[#2A3A6A] p-2 shadow-2xl"
                >
                    {workspaces.map((workspace) => {
                        const isCurrent = workspace.id === currentWorkspace.id;

                        return (
                            <DropdownMenuItem
                                key={workspace.id}
                                onClick={() => switchWorkspace(workspace.id)}
                                className={cn(
                                    "flex cursor-pointer items-center justify-between rounded-lg px-2 py-2.5",
                                    isCurrent && "bg-indigo-500/10",
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-sm font-bold">
                                        {workspace.name[0].toUpperCase()}
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">
                                            {workspace.name}
                                        </span>

                                        <span className="text-xs capitalize text-[#4A5580]">
                                            {workspace.role.toLowerCase()}
                                        </span>
                                    </div>
                                </div>

                                {isCurrent && <Check className="h-4 w-4 text-indigo-400" />}
                            </DropdownMenuItem>
                        );
                    })}

                    <DropdownMenuSeparator className="my-2" />

                    <DropdownMenuItem className="cursor-pointer rounded-lg px-2 py-2 text-muted-foreground focus:bg-[#1E2A4A]">
                        <Plus className="mr-3 h-4 w-4" />

                        <span className="text-sm font-medium">Create New Workspace</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
