import { Router } from "express";
import authMiddleware from "../../middleware/auth";

import * as taskController from "./task.controller";
import { controllerWrapper } from "../../utils/controllerWrapper";
import { validate } from "../../middleware/validate";
import {
    createTaskSchema,
    listTasksSchema,
    taskIdSchema,
    updateTaskSchema,
} from "./task.validation";

const task = controllerWrapper(taskController);

const router = Router();

router.use(authMiddleware);

router.post("/", validate(createTaskSchema), task.create);

router.patch("/:id", validate(updateTaskSchema), task.update);

router.get("/", validate(listTasksSchema, "query"), task.list);

router.get("/:id", validate(taskIdSchema, "params"), task.getOne);

router.delete("/:id", validate(taskIdSchema, "params"), task.remove);

export default router;
