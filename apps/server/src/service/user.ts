import { prisma } from "../config/prisma";

export const getUserByUsername = async (username: string) => {
    return prisma.user.findUnique({
        where: {
            userName: username,
        },
        select: {
            id: true,
            email: true,
        },
    });
};

export const getUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            email: true,
        },
    });
};
