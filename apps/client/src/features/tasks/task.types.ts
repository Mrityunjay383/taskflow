export type Task = {
    id: string;
    title: string;
    description: string | null;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    priority: "LOW" | "MEDIUM" | "HIGH";
    dueDate: string | null;
    createdAt: string;
    updatedAt: string;
};

export type TaskPagination = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

export type GetTasksResponse = {
    tasks: Task[];
    pagination: TaskPagination;
};
