import { prisma } from "../../config/prisma";
import {
    CheckSlugInput,
    CheckSlugResult,
    CreateWorkspaceInput,
    CreateWorkspaceResult,
    GetWorkspacesInput,
    GetWorkspacesResult,
} from "./workspace.types";
import { AppError } from "../../utils/AppError";

export const isSlugAvailable = async ({ slug }: CheckSlugInput): CheckSlugResult => {
    const existing = await prisma.workspace.findUnique({
        where: {
            slug,
        },
        select: {
            id: true,
        },
    });

    return {
        available: !existing,
    };
};

export const getWorkspaces = async ({
    userId,
}: GetWorkspacesInput): Promise<GetWorkspacesResult> => {
    const [owned, memberships] = await prisma.$transaction([
        prisma.workspace.findMany({
            where: {
                ownerId: userId,
            },
            select: {
                id: true,
                name: true,
                slug: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        }),

        prisma.workspaceMember.findMany({
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
        }),
    ]);

    return [
        ...owned.map((workspace) => ({
            ...workspace,
            role: "OWNER" as const,
        })),

        ...memberships.map(({ role, workspace }) => ({
            ...workspace,
            role,
        })),
    ];
};

export const createWorkspace = async ({
    ownerId,
    name,
    slug,
}: CreateWorkspaceInput): Promise<CreateWorkspaceResult> => {
    const existing = await prisma.workspace.findUnique({
        where: {
            slug,
        },
        select: {
            id: true,
        },
    });

    if (existing) {
        throw new AppError({
            statusCode: 400,
            errorCode: "SLUG_ALREADY_EXISTS",
            message: "Workspace slug already exists.",
        });
    }

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
