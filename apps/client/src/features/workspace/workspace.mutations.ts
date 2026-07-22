import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createWorkspace } from "./workspace.api";
// import { workspaceKeys } from "./workspace.keys";
import { authKeys } from "../auth/auth.keys";
import { useRouter } from "next/navigation";

export const useCreateWorkspaceMutation = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createWorkspace,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: authKeys.me,
            });

            // await queryClient.invalidateQueries({
            //     queryKey: workspaceKeys.all,
            // });

            router.replace("/dashboard");
        },
    });
};
