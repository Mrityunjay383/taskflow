import { createContext } from "./createContext";

export const createControllerModule = (controllers: any) => {
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

                if (result?.clearCookie) {
                    res.clearCookie("token", {
                        httpOnly: true,
                        sameSite: "lax",
                        secure: process.env.NODE_ENV === "production",
                    });
                }

                if (result?.token) {
                    res.cookie("token", result.token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: "lax",
                        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                    });
                }

                return res.status(result.statusCode || 200).json({
                    success: true,
                    data: result.data ?? result,
                });
            } catch (err) {
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                });
            }
        };
    });

    return wrapped;
};