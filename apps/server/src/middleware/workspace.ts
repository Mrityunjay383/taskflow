import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

export const requireWorkspace = (req: Request, _res: Response, next: NextFunction) => {
    const workspaceId = req.header("x-workspace-id");

    if (!workspaceId) {
        return next(
            new AppError({
                statusCode: 400,
                errorCode: "WORKSPACE_REQUIRED",
                message: "Workspace is required.",
            }),
        );
    }

    (req as any).workspaceId = workspaceId;

    next();
};
