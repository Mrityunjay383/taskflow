import WorkspaceSwitcher from "./WorkspaceSwitcher";
import SidebarNav from "./Nav";
import Footer from "@/components/dashboard/sidebar/Footer";
import Wrapper from "@/components/dashboard/sidebar/Wrapper";

export default function DashboardSidebar() {
    return (
        <Wrapper>
            <WorkspaceSwitcher />

            <div className="flex-1 overflow-y-auto">
                <SidebarNav />
            </div>

            <Footer />
        </Wrapper>
    );
}
