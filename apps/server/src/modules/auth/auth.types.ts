import { checkUserNameSchema } from "./auth.validation";
import { z } from "zod";

export type AuthUser = {
    id: string;
    userName: string;
    email: string;
    ownedWorkspaces: { id: string }[];
    workspaceMemberships: { id: string }[];
};

export type IsUniqueUserInput = z.infer<typeof checkUserNameSchema>;

export type CreateUserInput = {
    email: string;
    password: string;
    userName: string;
    select: any;
};

export type LoginUserInput = {
    identifier: string;
    password: string;
};

export type GetUser = {
    userId: string;
};

export type AuthResult = Promise<AuthUser>;
export type IsUniqueUserResult = Promise<{ available: boolean }>;
