import { Router } from "express";

import { controllerWrapper } from "../../utils/controllerWrapper";
import * as controller from "./workspace.controller";
import authMiddleware from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { checkSlugSchema } from "./workspace.validation";

const workspaceController = controllerWrapper(controller);

const router = Router();

router.get("/", authMiddleware, workspaceController.getWorkspaces);

router.get(
    "/check-slug",
    authMiddleware,
    validate(checkSlugSchema, "query"),
    workspaceController.getWorkspaces,
);

export default router;
