import {prisma} from "../../config/prisma";
import {
    CreateTaskResult,
    CreateTaskSInput,
    DeleteTaskInput,
    DeleteTaskResult,
    GetTaskInput,
    GetTaskResult,
    Task,
    TaskQueryInput,
    UpdateTaskInput,
    UpdateTaskResult,
} from "./task.types";


export const createTask = async ({userId, task}: CreateTaskSInput): CreateTaskResult => {
    const createdTask = await prisma.task.create({
        data: {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
            userId,
        },
    });

    return {
        success: true,
        data: createdTask as Task,
    };
};

export const getTasksByUser = async (input: TaskQueryInput) => {
    const {
        userId,
        page = 1,
        limit = 10,
        status,
        priority,
        search,
        sortBy = "createdAt",
        sortOrder = "desc",
    } = input;

    const skip = (page - 1) * limit;

    const tasks = await prisma.task.findMany({
        where: {
            userId,

            ...(status && {status}),
            ...(priority && {priority}),

            ...(search && {
                title: {
                    contains: search,
                    mode: "insensitive",
                },
            }),
        },

        skip,
        take: limit,

        orderBy: {
            [sortBy]: sortOrder,
        },
    });

    const total = await prisma.task.count({
        where: {
            userId,
            ...(status && {status}),
            ...(priority && {priority}),
            ...(search && {
                title: {
                    contains: search,
                    mode: "insensitive",
                },
            }),
        },
    });

    return {
        success: true,
        data: {
            tasks,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        },
    };
};

export const getTaskById = async ({id, userId}: GetTaskInput): GetTaskResult => {
    const task = await prisma.task.findFirst({
        where: {
            id,
            userId,
        },
    });

    if (!task) {
        return {
            success: false,
            message: "Task not found",
        };
    }

    return {
        success: true,
        data: task as Task,
    };
};

export const updateTask = async (
    {
        id,
        userId,
        task
    }: UpdateTaskInput
): UpdateTaskResult => {
    const updatedTask = await prisma.task.findFirst({
        where: {id, userId},
    });

    if (!updatedTask) {
        return {
            success: false,
            message: "Task not found",
        };
    }

    const updated = await prisma.task.update({
        where: {id},
        data: task,
    });

    return {
        success: true,
        data: updated as Task,
    };
};

export const deleteTask = async ({id, userId}: DeleteTaskInput): DeleteTaskResult => {
    const task = await prisma.task.findFirst({
        where: {id, userId},
    });

    if (!task) {
        return {
            success: false,
            message: "Task not found",
        };
    }

    await prisma.task.delete({
        where: {id},
    });

    return {
        success: true,
        data: {id},
    };
};