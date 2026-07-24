import { Router } from "express";

import { controllerWrapper } from "../../utils/controllerWrapper";
import * as controller from "./workspace.controller";
import authMiddleware from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { checkSlugSchema, createWorkspaceSchema, inviteMemberSchema } from "./workspace.validation";
import { requireWorkspace } from "../../middleware/workspace";

const workspaceController = controllerWrapper(controller);

const router = Router();

router.get("/check-slug", validate(checkSlugSchema, "query"), workspaceController.checkSlug);

router.get("/", authMiddleware, workspaceController.getWorkspaces);

router.post(
    "/",
    authMiddleware,
    validate(createWorkspaceSchema),
    workspaceController.createWorkspace,
);

router.get("/stats", authMiddleware, requireWorkspace, workspaceController.getWorkspaceStats);

router.post(
    "/invite",
    authMiddleware,
    requireWorkspace,
    validate(inviteMemberSchema),
    workspaceController.invite,
);

export default router;
