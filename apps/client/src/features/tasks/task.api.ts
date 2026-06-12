import { api } from "@/lib/api";
import { ApiResponse } from "@/lib/types";
import { GetTasksResponse } from "@/features/tasks/task.types";

export const getTasks = async (): Promise<GetTasksResponse> => {
    const response = await api.get<ApiResponse<GetTasksResponse>>("/task");

    return response.data.data!;
};

export const createTask = (data: any) => api.post("/tasks", data);

export const updateTask = (id: string, data: any) => api.patch(`/tasks/${id}`, data);

export const deleteTask = (id: string) => api.delete(`/tasks/${id}`);
