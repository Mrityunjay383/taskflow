import { checkSlugSchema, createWorkspaceSchema } from "./workspace.validation";
import { z } from "zod";

export type CheckSlugInput = z.infer<typeof checkSlugSchema>;

export type CheckSlugResult = Promise<{
    available: boolean;
}>;

export interface CreateWorkspaceResult {
    id: string;
    name: string;
    slug: string;
}

export type CreateWorkspaceInput = {
    ownerId: string;
    name: string;
    slug: string;
};
