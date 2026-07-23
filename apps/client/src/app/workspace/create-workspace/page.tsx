import CreateWorkspace from "@/components/common/CreateWorkspace";

const CreateNewWorkspacePage = () => {
    return (
        <div className="h-full flex justify-center items-center">
            <div className="rounded-2xl border border-[#1E293B] bg-[#0F172A] p-8 shadow-[0_0_0_1px_rgba(99,102,241,0.04),0_32px_64px_rgba(0,0,0,0.4)]">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-[26px] font-bold tracking-tight text-white">
                        Create a new workspace
                    </h1>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        Workspaces help you organize projects, teammates, and tasks.
                    </p>
                </div>

                {/* Form */}
                <CreateWorkspace />
            </div>
        </div>
    );
};

export default CreateNewWorkspacePage;
