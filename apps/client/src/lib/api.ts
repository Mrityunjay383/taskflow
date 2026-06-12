import axios from "axios";

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
        return Promise.reject(error);
    },
);
