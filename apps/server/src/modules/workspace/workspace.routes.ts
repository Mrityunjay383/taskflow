import { Router } from "express";

import { controllerWrapper } from "../../utils/controllerWrapper";
import * as controller from "./workspace.controller";
import authMiddleware from "../../middleware/auth";

const workspaceController = controllerWrapper(controller);

const router = Router();

router.get("/", authMiddleware, workspaceController.getWorkspaces);

export default router;
