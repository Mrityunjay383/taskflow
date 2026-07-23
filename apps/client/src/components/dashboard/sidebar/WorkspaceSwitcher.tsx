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
import { useSidebar } from "@/hooks/useSidebar";
import Link from "next/link";

export default function WorkspaceSwitcher() {
    const { collapsed } = useSidebar();

    const { workspaces, currentWorkspace, switchWorkspace, isLoading, isError, refetch } =
        useCurrentWorkspace();

    if (isLoading) return <WorkspaceSwitcherSkeleton />;

    if (isError) {
        return (
            <div className="border-b border-[#1E293B] p-4">
                <Button variant="outline" className="w-full" onClick={() => refetch()}>
                    Retry
                </Button>
            </div>
        );
    }

    if (!currentWorkspace) return null;

    return (
        <div className="border-b border-[#1E293B] p-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className={cn(
                            "group h-14 border border-[#2A3A6A] bg-[#1E2A4A] transition-all duration-200 hover:bg-[#1E2A4A]/80 hover:border-[#3A4A7A] data-[state=open]:border-indigo-500/50",
                            collapsed
                                ? "w-full justify-center px-0"
                                : "w-full justify-between px-3",
                        )}
                    >
                        <div className="flex items-center overflow-hidden">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-sm font-bold shadow-lg shadow-indigo-500/20">
                                {currentWorkspace.name[0].toUpperCase()}
                            </div>

                            <div
                                className={cn(
                                    "overflow-hidden transition-all duration-200",
                                    collapsed ? "ml-0 w-0 opacity-0" : "ml-3 w-full opacity-100",
                                )}
                            >
                                <p className="truncate text-left text-sm font-semibold">
                                    {currentWorkspace.name}
                                </p>
                                <p className="truncate text-left text-xs capitalize text-[#4A5580]">
                                    {currentWorkspace.role.toLowerCase()}
                                </p>
                            </div>
                        </div>

                        {!collapsed && (
                            <ChevronDown className="h-4 w-4 shrink-0 text-[#4A5580] transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-indigo-400" />
                        )}
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="start"
                    sideOffset={8}
                    className="w-[246px] rounded-xl border border-[#2A3A6A] p-2 shadow-2xl"
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

                    <DropdownMenuItem asChild>
                        <Link
                            href="/workspace/create-workspace"
                            className="cursor-pointer rounded-lg px-2 py-2.5 text-muted-foreground"
                        >
                            <Plus className="mr-3 h-4 w-4" />
                            <span className="text-sm font-medium">Create New Workspace</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
