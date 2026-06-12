import LeftPanel from "@/components/partials/login/LeftPanel";
import RightPanel from "@/components/partials/login/RightPanel";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#0F1629] flex">
            <LeftPanel />

            <RightPanel />
        </div>
    );
}
