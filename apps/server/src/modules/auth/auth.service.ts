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

export const createUser = async ({ email, password }: CreateUserInput): CreateUserResult => {
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
        },
        select: {
            id: true,
            email: true,
            role: true,
        },
    });

    return {
        id: user.id,
        email: user.email,
        role: user.role,
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
        email: user.email,
        role: user.role,
    };
};

export const getUserById = async ({ id }: GetUserByIdInput): GetUserByIdResult => {
    const existing = await prisma.user.findUnique({ where: { id } });

    if (!existing) {
        throw new AppError("User not found", 404);
    }

    return {
        id: existing.id,
        email: existing.email,
        role: existing.role,
    };
};
