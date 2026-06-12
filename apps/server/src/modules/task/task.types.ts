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

export type CreateTaskResult = Promise<Task>;
export type GetTasksResult = Promise<{
    tasks: Task[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export type GetTaskResult = Promise<Task>;
export type UpdateTaskResult = Promise<Task>;
export type DeleteTaskResult = Promise<string>;
