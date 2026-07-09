import { User } from "@/features/auth/auth.types";

export type ApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
};

export type AuthContextValue = {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
};
