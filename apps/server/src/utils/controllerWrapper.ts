import { Request } from "express";
import {RequestContext} from "../types";

const createContext = (req: Request): RequestContext => {
    return {
        body: req.body,
        query: req.query,
        params: req.params,
        user: (req as any).user,
        headers: req.headers,
    };
};

export const controllerWrapper = (controllers: any) => {
    const wrapped: any = {};

    Object.entries(controllers).forEach(([key, fn]: any) => {
        if (typeof fn !== "function") return;

        wrapped[key] = async (req: any, res: any, next: any) => {
            try {
                const ctx = createContext(req);

                const result = await fn(ctx);

                if (result?.success === false) {
                    return res.status(result.statusCode || 400).json({
                        success: false,
                        message: result.message,
                    });
                }

                const auth = result?.auth;

                if (auth?.clearToken) {
                    res.clearCookie("token", {
                        httpOnly: true,
                        sameSite: "lax",
                        secure: process.env.NODE_ENV === "production",
                    });
                }

                if (auth?.token) {
                    res.cookie("token", auth.token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: "lax",
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                    });
                }

                return res.status(result.statusCode || 200).json({
                    success: true,
                    data: result.data ?? result,
                    message: result.message,
                });
            } catch (err) {
                next(err);
            }
        };
    });

    return wrapped;
};