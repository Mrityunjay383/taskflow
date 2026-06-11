import { Router } from "express";
import * as authController from "./auth.controller";
import { createControllerModule } from "../../utils/createControllerModule";

import authMiddleware from "../../middleware/auth";
import {validate} from "../../middleware/validate";
import {loginSchema, registerSchema} from "./auth.validation";

const auth = createControllerModule(authController);

const router = Router();

router.post("/register", validate(registerSchema), auth.register);
router.post("/login", validate(loginSchema), auth.login);
router.post("/logout",authMiddleware, auth.logout);

export default router;