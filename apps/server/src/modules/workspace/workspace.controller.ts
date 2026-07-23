import { AuthContext } from "../../types";
import * as WorkspaceService from "./workspace.service";

export const checkSlug = async ({ query }: AuthContext) => {
    const existed = await WorkspaceService.isSlugAvailable({ slug: query.slug });

    return {
        success: true,
        data: existed,
    };
};

export const getWorkspaces = async ({ user }: AuthContext) => {
    const workspaces = await WorkspaceService.getWorkspaces({
        userId: user.userId,
    });

    return {
        success: true,
        data: workspaces,
    };
};

export const createWorkspace = async ({ body, user }: AuthContext) => {
    const workspace = await WorkspaceService.createWorkspace({
        ownerId: user.userId,
        name: body.name,
        slug: body.slug,
    });

    return {
        success: true,
        data: workspace,
    };
};

export const getWorkspaceStats = async ({ query }: AuthContext) => {
    return {
        success: true,
        data: {
            members: 0,
            projects: 0,
            tasks: 0,
            dueToday: 0,
        },
    };
};
