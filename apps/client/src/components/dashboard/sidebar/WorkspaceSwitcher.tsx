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
import { useCurrentWorkspace } from "@/hooks/useCurrentWorkspace";
import { WorkspaceSwitcherSkeleton } from "@/components/skeletons/WorkspaceSwitcher";

export default function WorkspaceSwitcher() {
    const { workspaces, currentWorkspace, setCurrentWorkspace, isLoading } = useCurrentWorkspace();

    if (isLoading) {
        return <WorkspaceSwitcherSkeleton />;
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
                        className="group h-14 w-full justify-between border border-[#2A3A6A] bg-[#1E2A4A] px-3 transition-all duration-200 hover:bg-[#1E2A4A]/80 hover:border-[#3A4A7A]"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-sm font-bold  shadow-lg shadow-indigo-500/20">
                                {currentWorkspace.name[0].toUpperCase()}
                            </div>

                            <div className="flex flex-col items-start overflow-hidden">
                                <span className="truncate text-sm font-semibold">
                                    {currentWorkspace.name}
                                </span>
                                <span className="truncate text-xs text-[#4A5580]">
                                    {currentWorkspace.role}
                                </span>
                            </div>
                        </div>

                        <ChevronDown className="h-4 w-4 text-[#4A5580] transition-all duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-indigo-400" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="start"
                    sideOffset={8}
                    className="w-[260px] rounded-xl border border-[#2A3A6A]  p-2 shadow-2xl"
                >
                    {workspaces.map((workspace) => (
                        <DropdownMenuItem
                            key={workspace.id}
                            className={`flex cursor-pointer items-center justify-between rounded-lg px-2 py-2.5 bg-indigo-500/10`}
                            onClick={() => setCurrentWorkspace(workspace.id)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-sm font-bold">
                                    {workspace.name[0].toUpperCase()}
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{workspace.name}</span>
                                    <span className="text-xs text-[#4A5580]">{workspace.role}</span>
                                </div>
                            </div>

                            {workspace.id === currentWorkspace.id && (
                                <Check className="h-4 w-4 text-indigo-400" />
                            )}
                        </DropdownMenuItem>
                    ))}

                    <DropdownMenuSeparator className="my-2" />

                    <DropdownMenuItem className="cursor-pointer rounded-lg px-2 py-2 text-muted-foreground focus:bg-[#1E2A4A] ">
                        <Plus className="mr-3 h-4 w-4" />
                        <span className="text-sm font-medium">Create New Workspace</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
