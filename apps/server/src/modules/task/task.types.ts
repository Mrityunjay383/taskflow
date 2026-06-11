import { ServiceResult } from "../../types";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type Task = {
    id: string;
    title: string;
    description: string | null;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: Date | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};

export type CreateTaskInput = {
    title: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    dueDate?: string;
};

export type UpdateTaskInputData = Partial<CreateTaskInput>;

export type CreateTaskSInput = {
    userId: string;
    task: CreateTaskInput;
};

export type TaskQueryInput = {
    userId: string;

    page?: number;
    limit?: number;

    status?: TaskStatus;
    priority?: TaskPriority;

    search?: string;

    sortBy?: "createdAt" | "dueDate";
    sortOrder?: "asc" | "desc";
};

export type GetTaskInput = {
    id: string;
    userId: string;
};

export type UpdateTaskInput = {
    id: string;
    userId: string;
    task: UpdateTaskInputData;
};

export type DeleteTaskInput = {
    id: string;
    userId: string;
};

export type CreateTaskResult = Promise<ServiceResult<Task>>;
export type GetTasksResult = Promise<ServiceResult<Task[]>>;
export type GetTaskResult =Promise <ServiceResult<Task>>
export type UpdateTaskResult = Promise<ServiceResult<Task>>;
export type DeleteTaskResult = Promise<ServiceResult<{ id: string }>>;