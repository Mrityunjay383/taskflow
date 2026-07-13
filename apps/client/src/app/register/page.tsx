import LeftPanel from "@/components/auth/LeftPanel";
import RegisterPanel from "@/components/auth/RegisterPanel";

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-[#0F1629] flex">
            <LeftPanel />

            <RegisterPanel />
        </div>
    );
}
