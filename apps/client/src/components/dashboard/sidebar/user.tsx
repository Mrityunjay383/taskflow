"use client";

import { LogOut, Settings, User } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function SidebarUser() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="group h-14 w-full justify-start border border-[#2A3A6A] bg-[#1E2A4A] px-3 transition-all duration-200 hover:bg-[#1E2A4A]/80 hover:border-[#3A4A7A]"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="rounded-lg bg-indigo-500 text-sm text-white font-bold">
                            MV
                        </AvatarFallback>
                    </Avatar>

                    <div className="ml-3 flex flex-col items-start overflow-hidden">
                        <span className="truncate text-sm font-semibold">Mrityunjay Vyas</span>
                        <span className="truncate text-xs text-[#4A5580]">
                            mrityunjay@taskflow.com
                        </span>
                    </div>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                side="top"
                align="start"
                className="w-[260px] rounded-xl border border-[#2A3A6A] p-2 shadow-2xl"
            >
                <DropdownMenuItem className="cursor-pointer rounded-lg px-2 py-2.5">
                    <User className="mr-3 h-4 w-4" />
                    <span className="text-sm font-medium">Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer rounded-lg px-2 py-2.5">
                    <Settings className="mr-3 h-4 w-4" />
                    <span className="text-sm font-medium">Preferences</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-2" />

                <DropdownMenuItem className="cursor-pointer rounded-lg px-2 py-2.5 text-red-400 focus:text-red-400">
                    <LogOut className="mr-3 h-4 w-4" />
                    <span className="text-sm font-medium">Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
