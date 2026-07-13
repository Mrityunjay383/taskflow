import { ReactNode } from "react";

// import WorkspaceSwitcher from "./workspace-switcher";

export default function DashboardSidebar({ children }: { children: ReactNode }) {
    return (
        <aside className="flex h-screen w-[280px] flex-col border-r border-[#1E293B] bg-[#0B1120]">
            {/* Workspace */}
            <div className="border-b border-[#1E293B] p-4">{/*<WorkspaceSwitcher />*/}</div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto">{children}</div>

            {/* Bottom */}
            <div className="border-t border-[#1E293B] p-4">Bottom Section</div>
        </aside>
    );
}
