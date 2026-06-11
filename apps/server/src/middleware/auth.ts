import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const cookieToken = req.cookies?.token;

        const authHeader = req.headers.authorization;
        const headerToken = authHeader?.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : null;

        const token = cookieToken || headerToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No token provided",
            });
        }

        const decoded = verifyToken(token);

        // attach user to request
        (req as any).user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized - Invalid token",
        });
    }
};

export default auth