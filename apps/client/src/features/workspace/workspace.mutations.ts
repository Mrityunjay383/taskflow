import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createWorkspace } from "./workspace.api";
import { workspaceKeys } from "./workspace.keys";
import { authKeys } from "../auth/auth.keys";
import { useRouter } from "next/navigation";
import { useCurrentWorkspace } from "@/hooks/useCurrentWorkspace";

export const useCreateWorkspaceMutation = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { switchWorkspace } = useCurrentWorkspace();

    return useMutation({
        mutationFn: createWorkspace,

        onSuccess: async (data) => {
            await queryClient.invalidateQueries({
                queryKey: authKeys.me,
            });

            await queryClient.invalidateQueries({
                queryKey: workspaceKeys.list(),
            });

            switchWorkspace(data.id);

            router.replace("/dashboard");
        },
    });
};
