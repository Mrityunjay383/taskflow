import { Router } from "express";
import * as controller from "./auth.controller";
import { controllerWrapper } from "../../utils/controllerWrapper";

import authMiddleware from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { checkUserNameSchema, loginSchema, registerSchema } from "./auth.validation";

const authController = controllerWrapper(controller);

const router = Router();

router.get("/check-username", validate(checkUserNameSchema, "query"), authController.checkUserName);
router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", authMiddleware, authController.logout);

router.get("/me", authMiddleware, authController.me);

export default router;
