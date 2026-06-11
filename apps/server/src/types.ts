export type AuthContext = RequestContext & {
    user: {
        userId: string;
        role: "USER" | "ADMIN";
    };
};

export type RequestContext<TBody = any, TQuery = any, TParams = any> = {
    body: TBody;
    query: TQuery;
    params: TParams;
    user?: any;
    headers: any;
};

export type ServiceResult<T = any> =
    | {
    success: true;
    data: T;
    message?: string;
}
    | {
    success: false;
    message: string;
    data?: never;
};