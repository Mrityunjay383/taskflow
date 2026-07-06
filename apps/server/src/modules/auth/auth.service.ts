import { prisma } from "../../config/prisma";
import { comparePassword, hashPassword } from "../../utils/password";
import {
    CreateUserInput,
    CreateUserResult,
    GetUserByIdInput,
    GetUserByIdResult,
    LoginUserInput,
    LoginUserResult,
} from "./auth.types";
import { AppError } from "../../utils/AppError";

export const createUser = async ({
    email,
    password,
    userName,
}: CreateUserInput): CreateUserResult => {
    const existing = await prisma.user.findUnique({
        where: { email },
    });

    if (existing) {
        throw new AppError("User already exists", 400);
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
