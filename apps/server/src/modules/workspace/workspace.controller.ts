import { AuthContext } from "../../types";
import * as WorkspaceService from "../../service/workspace";
import * as WorkspaceMemberService from "../../service/workspaceMember";
import * as InvitationService from "../../service/invitation";
import { AppError } from "../../utils/AppError";
import {
    buildWorkspaceList,
    ensureCanBeInvited,
    ensureCanInvite,
    resolveInvitee,
} from "./workspace.helper";

export const checkSlug = async ({ query }: AuthContext) => {
    const exist = await WorkspaceService.checkSlug(query.slug);

    return {
        success: true,
        data: exist,
    };
};

export const getWorkspaces = async ({ user }: AuthContext) => {
    const [ownedWorkspaces, joinedWorkspaces] = await Promise.all([
        WorkspaceService.getOwnedWorkspaces(user.userId),
        WorkspaceMemberService.getJoinedWorkspaces(user.userId),
    ]);

    return {
        success: true,
        data: buildWorkspaceList(ownedWorkspaces, joinedWorkspaces),
    };
};

export const createWorkspace = async ({ body, user }: AuthContext) => {
    const { slug, name } = body;

    const existing = await WorkspaceService.checkSlug(slug);

    if (existing) {
        throw new AppError({
            statusCode: 400,
            errorCode: "SLUG_ALREADY_EXISTS",
            message: "Workspace slug already exists.",
        });
    }

    const workspace = await WorkspaceService.createWorkspace({ name, slug, ownerId: user.userId });

    return {
        success: true,
        data: workspace,
    };
};

export const getWorkspaceStats = async ({ query, workspaceId }: AuthContext) => {
    console.log("workspaceId", workspaceId);

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

export const invite = async ({ body, user, workspaceId }: AuthContext) => {
    const { identifier, identifierValue, role } = body;

    const workspace = await WorkspaceService.getWorkspace(workspaceId);

    if (!workspace) {
        throw new AppError({
            statusCode: 404,
            errorCode: "WORKSPACE_NOT_FOUND",
            message: "Workspace not found.",
        });
    }

    await ensureCanInvite(workspace, user.userId);

    const invitee = await resolveInvitee(identifier, identifierValue);

    await ensureCanBeInvited({
        workspace,
        invitedById: user.userId,
        invitee,
    });

    const invitation = await InvitationService.createWorkspaceInvitation({
        workspaceId: workspace.id,
        invitedById: user.userId,
        invitee,
        role,
    });

    return {
        success: true,
        data: invitation,
    };
};
