import { AuthContext } from "../../types";
import * as WorkspaceService from "./workspace.service";

export const getWorkspaces = async ({ user }: AuthContext) => {
    //
};

export const checkSlug = async ({ query }: AuthContext) => {
    const existed = await WorkspaceService.isSlugAvailable({ slug: query.slug });

    return {
        success: true,
        data: existed,
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
