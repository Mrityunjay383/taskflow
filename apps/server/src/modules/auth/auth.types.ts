import { ServiceResult } from "../../types";

export type AuthUser = {
    id: string;
    email: string;
    role: string;
};


export type CreateUserInput = {
    email: string;
    password: string;
};

export type LoginUserInput = {
    email: string;
    password: string;
};

export type GetUserByIdInput = {
    id: string;
};


export type CreateUserResult = Promise<AuthUser>;
export type LoginUserResult = Promise<AuthUser>;
export type GetUserByIdResult = Promise<AuthUser>;