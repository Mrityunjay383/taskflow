import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login } from "./auth.api";

export const useLoginMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: login,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["me"],
            });
        },
    });
};
