import { Router } from "express";
import * as authController from "./auth.controller";
import { createControllerModule } from "../../utils/createControllerModule";

import authMiddleware from "../../middleware/auth";

const auth = createControllerModule(authController);

const router = Router();

router.post("/signup", auth.signup);
router.post("/login", auth.login);
router.post("/logout",authMiddleware, auth.logout);
router.get("/me", authMiddleware, auth.me);

export default router;