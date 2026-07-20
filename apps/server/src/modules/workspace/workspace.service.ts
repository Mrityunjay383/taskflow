import { prisma } from "../../config/prisma";
import { CheckSlugInput, CheckSlugResult } from "./workspace.types";

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
