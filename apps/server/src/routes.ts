import { Router } from "express";

import authRoutes from "./modules/auth/auth.routes";
import taskRoutes from "./modules/task/task.routes";
import workspaceRoutes from "./modules/workspace/workspace.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/task", taskRoutes);
router.use("/workspace", workspaceRoutes);

export default router;
