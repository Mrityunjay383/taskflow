export type AuthUser = {
    id: string;
    userName: string;
    email: string;
    onboardingRequired?: boolean;
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

export type GetUser = {
    userId: string;
};

export type CreateUserResult = Promise<AuthUser>;
export type IsUniqueUserResult = Promise<{ available: boolean }>;
export type LoginUserResult = Promise<AuthUser>;
export type GetResult = Promise<AuthUser>;
