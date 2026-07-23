import CreateWorkspace from "@/components/common/CreateWorkspace";
import TopBar from "@/components/common/TopBar";

const CreateNewWorkspacePage = () => {
    return (
        <>
            <TopBar
                head="Create Workspace"
                subhead="Workspaces help you organize projects, teammates, and tasks."
            />

            <div className="flex justify-center items-center h-[80vh] w-full">
                <div className="w-120">
                    <CreateWorkspace />
                </div>
            </div>
        </>
    );
};

export default CreateNewWorkspacePage;
