export type User = {
    id: string;
    email: string;
    role: string;
};

export type LoginPayload = {
    email: string;
    password: string;
};
