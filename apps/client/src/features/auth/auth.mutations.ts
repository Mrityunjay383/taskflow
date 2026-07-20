import { useMutation } from "@tanstack/react-query";

import { login, register } from "./auth.api";
import { useAuth } from "@/providers/auth-provider";

export const useLoginMutation = () => {
    const { setUser } = useAuth();

    return useMutation({
        mutationFn: login,
        onSuccess: (user) => {
            setUser(user);
        },
    });
};

export const useRegisterMutation = () => {
    const { setUser } = useAuth();

    return useMutation({
        mutationFn: register,
        onSuccess: (user) => {
            setUser(user);
        },
    });
};
