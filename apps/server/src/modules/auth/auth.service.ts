import { prisma } from "../../config/prisma";
import { comparePassword, hashPassword } from "../../utils/password";
import {
    CreateUserInput,
    CreateUserResult,
    GetUserByIdInput,
    GetUserByIdResult,
    IsUniqueUserInput,
    IsUniqueUserResult,
    LoginUserInput,
    LoginUserResult,
} from "./auth.types";
import { AppError } from "../../utils/AppError";

export const isAvailable = async ({ userName }: IsUniqueUserInput): IsUniqueUserResult => {
    const existing = await prisma.user.findUnique({
        where: {
            userName,
        },
        select: {
            id: true,
        },
    });

    return {
        available: !existing,
    };
};

export const createUser = async ({
    email,
    password,
    userName,
}: CreateUserInput): CreateUserResult => {
    const existing = await prisma.user.findFirst({
        where: {
            OR: [{ email }, { userName }],
        },
    });

    if (existing) {
        if (existing.email === email) {
            throw new AppError("Email already exists", 400);
        }

        if (existing.userName === userName) {
            throw new AppError("Username already exists", 400);
        }
    }

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashed,
            userName,
        },
        select: {
            id: true,
            userName: true,
        },
    });

    return {
        id: user.id,
        userName: user.userName,
    };
};

export const loginUser = async ({ email, password }: LoginUserInput): LoginUserResult => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new AppError("Invalid credentials", 400);
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
        throw new AppError("Invalid credentials", 400);
    }

    return {
        id: user.id,
        userName: user.userName,
    };
};

export const getUserById = async ({ id }: GetUserByIdInput): GetUserByIdResult => {
    const existing = await prisma.user.findUnique({ where: { id } });

    if (!existing) {
        throw new AppError("User not found", 404);
    }

    return {
        id: existing.id,
        userName: existing.userName,
    };
};
