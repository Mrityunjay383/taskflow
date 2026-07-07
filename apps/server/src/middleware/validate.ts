import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";

type Target = "body" | "query" | "params";

export const validate =
    (schema: ZodType, target: Target = "body") =>
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req[target]);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                data: result.error.issues.map((i) => ({
                    path: i.path.join("."),
                    message: i.message,
                })),
            });
        }

        // overwrite clean data
        // (req as any)[target] = result.data;

        next();
    };
