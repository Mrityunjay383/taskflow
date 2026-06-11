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


export type CreateUserResult = Promise<ServiceResult<AuthUser>>;
export type LoginUserResult = Promise<ServiceResult<AuthUser>>;
export type GetUserByIdResult = Promise<ServiceResult<AuthUser>>;