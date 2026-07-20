import { string } from "zod";

export type CheckSlugPayload = {
    slug: string;
};

export type CheckSlug = {
    available: boolean;
};

export type CreateWorkspacePayload = {
    name: string;
    slug: string;
};

export type CreateWorkspace = {
    id: true;
    name: true;
    slug: true;
};
