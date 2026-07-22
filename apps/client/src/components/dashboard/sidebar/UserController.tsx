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
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";

export default function UserController() {
    const { collapsed } = useSidebar();
    const { user } = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className={cn(
                        "h-14 w-full border border-[#2A3A6A] bg-[#1E2A4A] transition-all duration-200 hover:border-[#3A4A7A] hover:bg-[#1E2A4A]/80",
                        collapsed ? "justify-center !px-0" : "justify-start px-3",
                    )}
                >
                    <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="rounded-lg bg-indigo-500 text-sm text-white font-bold">
                            {user?.userName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    {!collapsed && (
                        <div className="ml-3 w-full overflow-hidden">
                            <span className="block truncate text-left text-sm font-semibold">
                                {user?.userName}
                            </span>
                            <span className="block truncate text-left text-xs text-[#4A5580]">
                                {user?.email}
                            </span>
                        </div>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                side="top"
                align={collapsed ? "center" : "start"}
                className="w-[260px] rounded-xl border border-[#2A3A6A] p-2 shadow-2xl"
            >
                <DropdownMenuItem className="cursor-pointer rounded-lg px-2 py-2.5">
                    <User className="mr-3 h-4 w-4 text-[#4A5580]" />
                    <span className="text-sm font-medium">Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer rounded-lg px-2 py-2.5">
                    <Settings className="mr-3 h-4 w-4 text-[#4A5580]" />
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
