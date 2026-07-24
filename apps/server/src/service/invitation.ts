import { prisma } from "../config/prisma";
import { InvitationStatus } from "@prisma/client";
import { CreateWorkspaceInvitationInput } from "./types";

export const getPendingInvitation = async (workspaceId: string, email: string) => {
    return prisma.invitation.findFirst({
        where: {
            workspaceId,
            email,
            status: InvitationStatus.PENDING,
            expiresAt: {
                gt: new Date(),
            },
        },
        select: {
            id: true,
        },
    });
};

export const createWorkspaceInvitation = async ({
    workspaceId,
    invitedById,
    invitee,
    role,
}: CreateWorkspaceInvitationInput) => {
    const expiresAt = new Date();

    expiresAt.setDate(expiresAt.getDate() + 7);

    return prisma.invitation.create({
        data: {
            workspaceId,
            invitedById,
            email: invitee.email,
            role,
            expiresAt,
        },
        select: {
            id: true,
            email: true,
            role: true,
            status: true,
            expiresAt: true,
        },
    });
};
