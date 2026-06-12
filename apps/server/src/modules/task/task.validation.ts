import { z } from "zod";

export const TaskStatusEnum = z.enum(["TODO", "IN_PROGRESS", "COMPLETED"]);

export const TaskPriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);

export const createTaskSchema = z.object({
    title: z.string().min(1, "Title is required"),

    description: z.string().optional(),

    status: TaskStatusEnum.optional(),

    priority: TaskPriorityEnum.optional(),

    dueDate: z
        .string()
        .optional()
        .refine((val) => {
            if (!val) return true;
            return !isNaN(Date.parse(val));
        }, "Invalid date format"),
});

export const updateTaskSchema = createTaskSchema.partial();

export const listTasksSchema = z.object({
    page: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : 1))
        .refine((val) => val > 0, "Page must be greater than 0"),

    limit: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : 10))
        .refine((val) => val > 0 && val <= 100, "Limit must be between 1 and 100"),

    search: z.string().optional(),

    status: TaskStatusEnum.optional(),

    priority: TaskPriorityEnum.optional(),

    sortBy: z.enum(["createdAt", "dueDate"]).optional(),

    sortOrder: z.enum(["asc", "desc"]).optional(),
});

export const taskIdSchema = z.object({
    id: z.string().uuid("Invalid task id"),
});
