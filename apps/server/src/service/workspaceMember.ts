import { prisma } from "../config/prisma";
import { WorkspaceMembership } from "./types";

export const getMember = async (workspaceId: string, userId: string) => {
    return prisma.workspaceMember.findUnique({
        where: {
            workspaceId_userId: {
                workspaceId,
                userId,
            },
        },
        select: {
            role: true,
        },
    });
};

export const getJoinedWorkspaces = async (userId: string): Promise<WorkspaceMembership[]> => {
    return prisma.workspaceMember.findMany({
        where: {
            userId,
        },
        select: {
            role: true,
            workspace: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    createdAt: true,
                },
            },
        },
    });
};
