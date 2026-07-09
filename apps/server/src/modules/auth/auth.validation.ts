import { z } from "zod";

export const checkUserNameSchema = z.object({
    userName: z
        .string()
        .trim()
        .min(1, "Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username cannot exceed 20 characters")
        .regex(/^[a-zA-Z0-9._-]+$/, "Username can only contain letters, numbers, '.', '_' and '-'"),
});

export const registerSchema = z.object({
    userName: z
        .string()
        .trim()
        .min(1, "Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username cannot exceed 20 characters")
        .regex(/^[a-zA-Z0-9._-]+$/, "Username can only contain letters, numbers, '.', '_' and '-'"),
    email: z.string().email("Invalid email format"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password too long"),
});

export const loginSchema = z.object({
    identifier: z.string().trim().min(1, "Email or username is required"),

    password: z.string().min(1, "Password is required"),
});
