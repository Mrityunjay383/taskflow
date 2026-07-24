import axios from "axios";
import { usePreferencesStore } from "@/stores/ui-preferences.store";
import { userLogout } from "@/helpers/userLogout";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const { currentWorkspaceId } = usePreferencesStore.getState();

    if (currentWorkspaceId) {
        config.headers["x-workspace-id"] = currentWorkspaceId;
    }

    return config;
});

api.interceptors.response.use(
    (response) => {
        const result = response.data;

        if (result?.success === false) {
            throw new Error(result.message || "Request failed");
        }

        return response;
    },
    async (error) => {
        if (error.response.status === 401) {
            await userLogout({ invalidateUser: error.config?.url !== "/auth/me" });
        }

        return Promise.reject(error);
    },
);
