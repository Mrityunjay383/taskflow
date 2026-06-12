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
