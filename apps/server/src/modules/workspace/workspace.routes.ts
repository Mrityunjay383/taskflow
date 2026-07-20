import { Router } from "express";

import { controllerWrapper } from "../../utils/controllerWrapper";
import * as controller from "./workspace.controller";
import authMiddleware from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { checkSlugSchema, createWorkspaceSchema } from "./workspace.validation";

const workspaceController = controllerWrapper(controller);

const router = Router();

router.get("/", authMiddleware, workspaceController.getWorkspaces);

router.post(
    "/",
    authMiddleware,
    validate(createWorkspaceSchema),
    workspaceController.createWorkspace,
);

router.get("/check-slug", validate(checkSlugSchema, "query"), workspaceController.checkSlug);

export default router;
