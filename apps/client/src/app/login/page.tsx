import LeftPanel from "@/components/partials/auth/LeftPanel";
import LoginPanel from "@/components/partials/auth/LoginPanel";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#0F1629] flex">
            <LeftPanel />

            <LoginPanel />
        </div>
    );
}
