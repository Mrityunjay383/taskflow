import { User } from "@/features/auth/auth.types";

export type ApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
};

export interface AuthContextValue {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;

    setUser: (user: User) => void;
    clearUser: () => void;
}

export type ApiErrorResponse = {
    success: false;
    message: string;
    errorCode: string;
    issues?: [
        {
            path: string;
            message: string;
        },
    ];
};
