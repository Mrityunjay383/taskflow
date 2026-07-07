export type User = {
    id: string;
    email: string;
    role: string;
};

export type RegisterPayload = {
    email: string;
    password: string;
    userName: string;
};

export type LoginPayload = {
    email: string;
    password: string;
};
