import { Request } from "express";

export type RequestContext<TBody = any, TQuery = any, TParams = any> = {
    body: TBody;
    query: TQuery;
    params: TParams;
    user?: any;
    headers: any;
};

export const createContext = (req: Request): RequestContext => {
    return {
        body: req.body,
        query: req.query,
        params: req.params,
        user: (req as any).user,
        headers: req.headers,
    };
};