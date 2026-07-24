import { WorkspaceRole } from "@prisma/client";
import { ResolvedInvitee } from "../modules/workspace/workspace.types";

export type CreateWorkspaceInvitationInput = {
    workspaceId: string;
    invitedById: string;
    invitee: ResolvedInvitee;
    role: WorkspaceRole;
};

export type WorkspaceSummary = {
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
};
export type WorkspaceMembership = {
    role: WorkspaceRole;
    workspace: WorkspaceSummary;
};
