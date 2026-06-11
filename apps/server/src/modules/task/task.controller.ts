import * as TaskService from "./task.service"
import {AuthContext} from "../../types";

export const create = async ({ body, user }: AuthContext) => {
    if (!user?.userId) {
        return {
            success: false,
            message: "Unauthorized",
        };
    }

    return await TaskService.createTask({userId: user.userId, task: body});
};

export const list = async ({user, query}: AuthContext) => {

    return await TaskService.getTasksByUser({
        userId: user.userId,
        page: Number(query.page),
        limit: Number(query.limit),
        status: query.status,
        priority: query.priority,
        search: query.search,
        sortBy: query.sortBy,
        sortOrder: query.sortOrder,
    });
};

export const getOne = async ({ params, user }: AuthContext) => {
    return await TaskService.getTaskById({id: params.id, userId:user.userId});
};

export const update = async ({ params, body, user }: AuthContext) => {
    return await TaskService.updateTask({id: params.id, userId:user.userId, task:body});
};

export const remove = async ({ params, user }: AuthContext) => {
    return await TaskService.deleteTask({id: params.id, userId: user.userId});
};