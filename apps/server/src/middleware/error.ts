import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { Prisma } from "@prisma/client";

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    // Prisma errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
                return res.status(409).json({
                    success: false,
                    message: `Duplicate field: ${err.meta?.target}`,
                });

            case "P2025":
                return res.status(404).json({
                    success: false,
                    message: "Record not found",
                });

            case "P2003":
                return res.status(400).json({
                    success: false,
                    message: "Invalid reference (foreign key constraint)",
                });

            default:
                return res.status(400).json({
                    success: false,
                    message: "Database error",
                });
        }
    }

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    // fallback
    return res.status(500).json({
        success: false,
        message: "Internal server error",
    });
};
