import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error";

import apiRoutes from "./routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.get("/health", (_, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
    });
});

app.use("/api", apiRoutes);

app.use(errorMiddleware);

export default app;
