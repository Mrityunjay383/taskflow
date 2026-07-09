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
import { z } from "zod";

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
            throw new AppError({
                message: "Email already exist",
                errorCode: "EMAIL_EXISTS",
                statusCode: 400,
            });
        }

        if (existing.userName === userName) {
            throw new AppError({
                message: "Username already exists",
                errorCode: "USERNAME_EXISTS",
                statusCode: 400,
            });
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

export const loginUser = async ({ identifier, password }: LoginUserInput): LoginUserResult => {
    const isEmail = z.email().safeParse(identifier).success;

    const user = isEmail
        ? await prisma.user.findUnique({
              where: { email: identifier },
          })
        : await prisma.user.findUnique({
              where: { userName: identifier },
          });

    if (!user) {
        throw new AppError({
            message: "Provided creds are not correct",
            errorCode: "INVALID_CREDS",
            statusCode: 400,
        });
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
        throw new AppError({
            message: "Provided creds are not correct",
            errorCode: "INVALID_CREDS",
            statusCode: 400,
        });
    }

    return {
        id: user.id,
        userName: user.userName,
    };
};

export const getUserById = async ({ id }: GetUserByIdInput): GetUserByIdResult => {
    const existing = await prisma.user.findUnique({ where: { id } });

    if (!existing) {
        throw new AppError({
            message: "User not found",
            errorCode: "NO_USER_FOUND",
            statusCode: 404,
        });
    }

    return {
        id: existing.id,
        userName: existing.userName,
    };
};
