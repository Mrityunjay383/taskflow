import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/lib/types";

export function getApiError(error: unknown): ApiErrorResponse {
    if (error instanceof AxiosError && error.response?.data) {
        return error.response.data;
    }

    return {
        success: false,
        message: "Something went wrong",
        errorCode: "UNKNOWN_ERROR",
    };
}
