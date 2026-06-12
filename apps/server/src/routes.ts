import { Router } from "express";

import authRoutes from "./modules/auth/auth.routes";
import taskRoutes from "./modules/task/task.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/task", taskRoutes);

export default router;
