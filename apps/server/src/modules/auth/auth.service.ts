import { prisma } from "../../config/prisma";
import { comparePassword, hashPassword } from "../../utils/password";
import {
    AuthResult,
    CreateUserInput,
    GetUser,
    IsUniqueUserInput,
    IsUniqueUserResult,
    LoginUserInput,
} from "./auth.types";
import { AppError } from "../../utils/AppError";
import { z } from "zod";
import { currentUserSelect, toCurrentUser } from "./auth.utils";

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

export const createUser = async ({ email, password, userName }: CreateUserInput): AuthResult => {
    const existing = await prisma.user.findFirst({
        where: {
            OR: [{ email }, { userName }],
        },
    });

    if (existing?.email === email) {
        throw new AppError({
            message: "Email already exists",
            errorCode: "EMAIL_EXISTS",
            statusCode: 400,
        });
    }

    if (existing?.userName === userName) {
        throw new AppError({
            message: "Username already exists",
            errorCode: "USERNAME_EXISTS",
            statusCode: 400,
        });
    }

    const user = await prisma.user.create({
        data: {
            email,
            password: await hashPassword(password),
            userName,
        },
        select: currentUserSelect,
    });

    return toCurrentUser(user);
};

export const loginUser = async ({ identifier, password }: LoginUserInput): AuthResult => {
    const isEmail = z.email().safeParse(identifier).success;

    const user = await prisma.user.findUnique({
        where: isEmail ? { email: identifier } : { userName: identifier },
        select: currentUserSelect,
    });

    if (!user || !(await comparePassword(password, user.password))) {
        throw new AppError({
            message: "Invalid email/username or password",
            errorCode: "INVALID_CREDS",
            statusCode: 400,
        });
    }

    return toCurrentUser(user);
};

export const getCurrentUser = async ({ userId }: GetUser): AuthResult => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: currentUserSelect,
    });

    if (!user) {
        throw new AppError({
            statusCode: 401,
            message: "User not found.",
            errorCode: "USER_NOT_FOUND",
        });
    }

    return toCurrentUser(user);
};
