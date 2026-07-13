"use client";

import { ChevronDown, Plus } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

export default function WorkspaceSwitcher() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-auto w-full items-center justify-between rounded-xl p-3 hover:bg-[#111827]"
                >
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 text-lg font-semibold text-white">
                            T
                        </div>

                        <div className="flex flex-col items-start">
                            <span className="text-sm font-semibold text-white">TaskFlow</span>

                            <span className="text-xs text-slate-400">Free Workspace</span>
                        </div>
                    </div>

                    <ChevronDown className="h-4 w-4 text-slate-400" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-72 border-[#1E293B] bg-[#111827]">
                <DropdownMenuItem>TaskFlow</DropdownMenuItem>

                <DropdownMenuItem>Marketing</DropdownMenuItem>

                <DropdownMenuItem>Engineering</DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Workspace
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
