import axios from "axios";
import { logout } from "@/features/auth/auth.api";
import { queryClient } from "@/lib/queryClient";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => {
        const result = response.data;

        if (result?.success === false) {
            throw new Error(result.message || "Request failed");
        }

        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            logout();

            if (error.config?.url !== "/auth/me") {
                queryClient.invalidateQueries({
                    queryKey: ["me"],
                });
            }
        }

        return Promise.reject(error);
    },
);
