import { checkSlugSchema, createWorkspaceSchema } from "./workspace.validation";
import { z } from "zod";

export type CheckSlugInput = z.infer<typeof checkSlugSchema>;

export type CheckSlugResult = Promise<{
    available: boolean;
}>;

export type GetWorkspacesInput = {
    userId: string;
};

export type GetWorkspacesResult = {
    id: string;
    name: string;
    slug: string;
    role: string;
}[];

export type CreateWorkspaceInput = {
    ownerId: string;
    name: string;
    slug: string;
};

export interface CreateWorkspaceResult {
    id: string;
    name: string;
    slug: string;
}
