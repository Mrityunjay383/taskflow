import { prisma } from "../config/prisma";
import { WorkspaceSummary } from "./types";

export const checkSlug = async (slug: string) => {
    return prisma.workspace.findUnique({
        where: {
            slug,
        },
        select: {
            id: true,
        },
    });
};

export const getWorkspace = async (workspaceId: string) => {
    return prisma.workspace.findUnique({
        where: { id: workspaceId },
        select: {
            id: true,
            ownerId: true,
        },
    });
};

export const getOwnedWorkspaces = async (ownerId: string): Promise<WorkspaceSummary[]> => {
    return prisma.workspace.findMany({
        where: {
            ownerId,
        },
        select: {
            id: true,
            name: true,
            slug: true,
            createdAt: true,
        },
    });
};

export const createWorkspace = async ({
    ownerId,
    name,
    slug,
}: {
    ownerId: string;
    name: string;
    slug: string;
}) => {
    return await prisma.workspace.create({
        data: {
            name,
            slug,

            owner: {
                connect: {
                    id: ownerId,
                },
            },
        },
        select: {
            id: true,
            name: true,
            slug: true,
        },
    });
};
