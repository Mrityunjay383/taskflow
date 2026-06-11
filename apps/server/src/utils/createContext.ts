import { Request } from "express";
import {RequestContext} from "../types";

export const createContext = (req: Request): RequestContext => {
    return {
        body: req.body,
        query: req.query,
        params: req.params,
        user: (req as any).user,
        headers: req.headers,
    };
};