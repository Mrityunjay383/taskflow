export type AuthContext = RequestContext & {
    user: {
        userId: string;
    };
    workspaceId: string;
};

export type RequestContext<TBody = any, TQuery = any, TParams = any> = {
    body: TBody;
    query: TQuery;
    params: TParams;
    user?: any;
    workspaceId?: string;
    headers: any;
};
