import { api } from "@/lib/api";
import { LoginPayload, User } from "@/features/auth/auth.types";
import { ApiResponse } from "@/lib/types";

export const login = async (payload: LoginPayload): Promise<User> => {
    const response = await api.post<ApiResponse<User>>("/auth/login", payload);

    return response.data.data!;
};

export const register = async (payload: LoginPayload): Promise<User> => {
    const response = await api.post<ApiResponse<User>>("/auth/register", payload);

    return response.data.data!;
};

export const getCurrentUser = async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>("/auth/me");

    return response.data.data!;
};
