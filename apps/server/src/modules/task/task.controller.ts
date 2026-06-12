import * as TaskService from "./task.service";
import { AuthContext } from "../../types";

export const create = async ({ body, user }: AuthContext) => {
    if (!user?.userId) {
        return {
            success: false,
            message: "Unauthorized user",
        };
    }

    const newTask = await TaskService.createTask({ userId: user.userId, task: body });

    return {
        success: true,
        statusCode: 201,
        data: newTask,
    };
};

export const list = async ({ user, query }: AuthContext) => {
    const lastList = await TaskService.getTasksByUser({
        userId: user.userId,
        ...query,
    });

    return {
        success: true,
        data: lastList,
    };
};

export const getOne = async ({ params, user }: AuthContext) => {
    const task = await TaskService.getTaskById({ id: params.id, userId: user.userId });

    return {
        success: true,
        data: task,
    };
};

export const update = async ({ params, body, user }: AuthContext) => {
    const updatedTask = await TaskService.getTaskById({ id: params.id, userId: user.userId });

    return {
        success: true,
        data: updatedTask,
    };
};

export const remove = async ({ params, user }: AuthContext) => {
    const deletedTaskId = await TaskService.getTaskById({ id: params.id, userId: user.userId });

    return {
        success: true,
        data: deletedTaskId,
    };
};
