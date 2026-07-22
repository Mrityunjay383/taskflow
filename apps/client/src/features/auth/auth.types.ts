export type User = {
    id: string;
    email: string;
    userName: string;
    onboardingRequired: boolean;
};

export type CheckUserName = {
    available: boolean;
};

export type RegisterPayload = {
    email: string;
    password: string;
    userName: string;
};

export type LoginPayload = {
    identifier: string;
    password: string;
};

export type CheckUserNamePayload = {
    userName: string;
};
