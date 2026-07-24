import { WorkspaceRole } from "@prisma/client";
import { WorkspaceSummary } from "../../service/types";
import { WorkspaceUserRoleObj } from "./workspace.constants";

export type InviteIdentifierType = "EMAIL" | "USERNAME";

export type ResolvedInvitee = {
    email: string;
    invitedUserId: string | null;
};

export type Workspace = {
    id: string;
    ownerId: string;
};

export type EnsureCanBeInvitedInput = {
    workspace: Workspace;
    invitedById: string;
    invitee: ResolvedInvitee;
};

export type WorkspaceUserRole = (typeof WorkspaceUserRoleObj)[keyof typeof WorkspaceUserRoleObj];

export type WorkspaceListItem = WorkspaceSummary & {
    role: WorkspaceUserRole;
};
