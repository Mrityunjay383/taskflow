import { prisma } from "../config/prisma";
import { hashPassword } from "../utils/password";
import { AuthResult, CreateUserInput } from "../modules/auth/auth.types";
import { currentUserSelect } from "../modules/auth/auth.helper";
import { z } from "zod";

export const getById = async ({ userId }: { userId: string }) => {
    return prisma.user.findUnique({
        where: { id: userId },
        select: currentUserSelect,
    });
};

export const getUserByUsername = async (userName: string) => {
    return prisma.user.findUnique({
        where: {
            userName,
        },
        select: {
            id: true,
            email: true,
        },
    });
};

export const getByUsernameOrEmail = async ({
    userName,
    email,
}: {
    userName: string;
    email: string;
}) => {
    return await prisma.user.findFirst({
        where: {
            OR: [{ email }, { userName }],
        },
    });
};

export const getByUsernameOrEmailSelect = async ({ identifier }: { identifier: string }) => {
    const isEmail = z.email().safeParse(identifier).success;

    return prisma.user.findUnique({
        where: isEmail ? { email: identifier } : { userName: identifier },
        select: currentUserSelect,
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

export const createUser = async ({
    email,
    password,
    userName,
    select,
}: CreateUserInput): AuthResult => {
    return prisma.user.create({
        data: {
            email,
            password: await hashPassword(password),
            userName,
        },
        select,
    });
};
