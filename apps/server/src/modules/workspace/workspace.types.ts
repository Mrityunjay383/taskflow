import { checkSlugSchema } from "./workspace.validation";
import { z } from "zod";

export type CheckSlugInput = z.infer<typeof checkSlugSchema>;

export type CheckSlugResult = Promise<{
    available: boolean;
}>;
