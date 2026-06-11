import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error";

import authRoutes from "./modules/auth/auth.routes";
import taskRoutes from "./modules/task/task.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(errorMiddleware);

app.get("/health", (_, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
    });
});

app.use("/auth", authRoutes);
app.use("/task", taskRoutes);

export default app;