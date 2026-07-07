import { z } from "zod";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    userName: z.string(),
    email: z.email(),
    password: z.string().min(6),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
