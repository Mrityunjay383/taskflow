import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login, register } from "./auth.api";

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

export const useRegisterMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: register,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["me"],
            });
        },
    });
};
