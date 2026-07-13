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
                    className="h-auto w-full justify-start rounded-xl p-2 hover:bg-[#111827]"
                >
                    <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-indigo-500 text-white font-semibold">
                            MV
                        </AvatarFallback>
                    </Avatar>

                    <div className="ml-3 flex flex-col items-start overflow-hidden">
                        <span className="truncate text-sm font-medium text-white">
                            Mrityunjay Vyas
                        </span>

                        <span className="truncate text-xs text-slate-400">
                            mrityunjay@taskflow.com
                        </span>
                    </div>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                side="top"
                align="start"
                className="w-60 border-[#1E293B] bg-[#111827]"
            >
                <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Preferences
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-red-400 focus:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
