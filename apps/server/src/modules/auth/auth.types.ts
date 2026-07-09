export type AuthUser = {
    id: string;
    userName: string;
};

export type IsUniqueUserInput = {
    userName: string;
};

export type CreateUserInput = {
    email: string;
    password: string;
    userName: string;
};

export type LoginUserInput = {
    identifier: string;
    password: string;
};

export type GetUserByIdInput = {
    id: string;
};

export type CreateUserResult = Promise<AuthUser>;
export type IsUniqueUserResult = Promise<{ available: boolean }>;
export type LoginUserResult = Promise<AuthUser>;
export type GetUserByIdResult = Promise<AuthUser>;
