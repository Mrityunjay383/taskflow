import {
    EnsureCanBeInvitedInput,
    InviteIdentifierType,
    ResolvedInvitee,
    Workspace,
    WorkspaceListItem,
} from "./workspace.types";
import { InviteIdentifier, WorkspaceUserRoleObj } from "./workspace.constants";
import { AppError } from "../../utils/AppError";
import { WorkspaceRole } from "@prisma/client";
import * as WorkspaceMemberService from "../../service/workspaceMember";
import * as UserService from "../../service/user";
import * as InvitationService from "../../service/invitation";
import { WorkspaceMembership, WorkspaceSummary } from "../../service/types";

export const buildWorkspaceList = (
    owned: WorkspaceSummary[],
    memberships: WorkspaceMembership[],
): WorkspaceListItem[] => {
    return [
        ...owned.map((workspace) => ({
            ...workspace,
            role: WorkspaceUserRoleObj.OWNER,
        })),

        ...memberships.map(({ workspace, role }) => ({
            ...workspace,
            role,
        })),
    ];
};

export const resolveInvitee = async (
    identifier: InviteIdentifierType,
    value: string,
): Promise<ResolvedInvitee> => {
    if (identifier === InviteIdentifier.USERNAME) {
        const user = await UserService.getUserByUsername(value);

        if (!user) {
            throw new AppError({
                statusCode: 404,
                errorCode: "USERNAME_NOT_FOUND",
                message: "User not found.",
            });
        }

        return {
            invitedUserId: user.id,
            email: user.email.toLowerCase(),
        };
    }

    const email = value.toLowerCase();

    const user = await UserService.getUserByEmail(email);

    return {
        invitedUserId: user?.id ?? null,
        email,
    };
};

export const ensureCanInvite = async (workspace: Workspace, userId: string) => {
    if (workspace.ownerId === userId) {
        return;
    }

    const member = await WorkspaceMemberService.getMember(workspace.id, userId);

    if (!member || member.role !== WorkspaceRole.MANAGER) {
        throw new AppError({
            statusCode: 403,
            errorCode: "INSUFFICIENT_PERMISSIONS",
            message: "You don't have permission to invite members.",
        });
    }
};

export const ensureCanBeInvited = async ({
    workspace,
    invitedById,
    invitee,
}: EnsureCanBeInvitedInput) => {
    if (invitee.invitedUserId === invitedById) {
        throw new AppError({
            statusCode: 400,
            errorCode: "CANNOT_INVITE_SELF",
            message: "You cannot invite yourself.",
        });
    }

    const [member, invitation] = await Promise.all([
        invitee.invitedUserId
            ? WorkspaceMemberService.getMember(workspace.id, invitee.invitedUserId)
            : Promise.resolve(null),

        InvitationService.getPendingInvitation(workspace.id, invitee.email),
    ]);

    if (invitee.invitedUserId && workspace.ownerId === invitee.invitedUserId) {
        throw new AppError({
            statusCode: 400,
            errorCode: "ALREADY_MEMBER",
            message: "User is already a member.",
        });
    }

    if (member) {
        throw new AppError({
            statusCode: 400,
            errorCode: "ALREADY_MEMBER",
            message: "User is already a member.",
        });
    }

    if (invitation) {
        throw new AppError({
            statusCode: 400,
            errorCode: "INVITATION_ALREADY_EXISTS",
            message: "A pending invitation already exists.",
        });
    }
};
