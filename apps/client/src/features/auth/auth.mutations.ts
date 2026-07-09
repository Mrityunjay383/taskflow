import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login, register } from "./auth.api";

export const useLoginMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: login,

        onSuccess: (user) => {
            queryClient.setQueryData(["me"], user);
        },
    });
};

export const useRegisterMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: register,

        onSuccess: (user) => {
            queryClient.setQueryData(["me"], user);
        },
    });
};
