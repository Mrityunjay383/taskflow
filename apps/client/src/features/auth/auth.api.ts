import { api } from "@/lib/api";
import {
    CheckUserName,
    CheckUserNamePayload,
    LoginPayload,
    RegisterPayload,
    User,
} from "@/features/auth/auth.types";
import { ApiResponse } from "@/lib/types";

export const checkUserName = async (payload: CheckUserNamePayload): Promise<CheckUserName> => {
    const response = await api.get<ApiResponse<CheckUserName>>("/auth/check-username", {
        params: payload,
    });

    return response.data.data!;
};

export const login = async (payload: LoginPayload): Promise<User> => {
    const response = await api.post<ApiResponse<User>>("/auth/login", payload);

    return response.data.data!;
};

export const register = async (payload: RegisterPayload): Promise<User> => {
    const response = await api.post<ApiResponse<User>>("/auth/register", payload);

    return response.data.data!;
};

export const getCurrentUser = async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>("/auth/me");

    return response.data.data!;
};

export const logout = async (): Promise<void> => {
    await api.post<ApiResponse<null>>("/auth/logout");
};
