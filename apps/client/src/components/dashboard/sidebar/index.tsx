import WorkspaceSwitcher from "./WorkspaceSwitcher";
import SidebarNav from "@/components/dashboard/sidebar/Nav";
import UserController from "@/components/dashboard/sidebar/UserController";

export default function DashboardSidebar() {
    return (
        <aside className="flex h-screen w-[280px] flex-col border-r border-[#1E293B] bg-[#0B1120]">
            {/* Workspace */}
            <WorkspaceSwitcher />

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto">
                <SidebarNav />
            </div>

            {/* Bottom */}
            <div className="border-t border-[#1E293B] p-4">
                <UserController />
            </div>
        </aside>
    );
}
