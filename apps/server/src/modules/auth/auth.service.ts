import {prisma} from "../../config/prisma";
import {comparePassword, hashPassword} from "../../utils/password";
import {ServiceResult} from "../../types";
import {
    CreateUserInput,
    CreateUserResult,
    GetUserByIdInput,
    GetUserByIdResult,
    LoginUserInput,
    LoginUserResult
} from "./auth.types";

export const createUser = async ({email, password}: CreateUserInput): CreateUserResult => {
    const existing = await prisma.user.findUnique({
        where: {email},
    });

    if (existing) {
        return {
            success: false,
            message: "User already exists",
        };
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
        success: true,
        data: user,
    };
};

export const loginUser = async ({email, password}: LoginUserInput): LoginUserResult => {
    const user = await prisma.user.findUnique({
        where: {email},
    });

    if (!user) {
        return {
            success: false,
            message: "Invalid credentials",
        };
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
        return {
            success: false,
            message: "Invalid credentials",
        };
    }

    return {
        success: true,
        data: {
            id: user.id,
            email: user.email,
            role: user.role,
        },
    };
};

export const getUserById = async ({id}: GetUserByIdInput): GetUserByIdResult => {
    const user = await prisma.user.findUnique({
        where: {id},
        select: {
            id: true,
            email: true,
            role: true,
        },
    });

    if (!user) {
        return {
            success: false,
            message: "User not found",
        };
    }

    return {
        success: true,
        data: user,
    };
};