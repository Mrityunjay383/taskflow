import { z } from "zod";
import { WorkspaceRole } from "@prisma/client";
import { InviteIdentifier, MESSAGES } from "./workspace.constants";

export const checkSlugSchema = z.object({
    slug: z
        .string()
        .trim()
        .min(3, MESSAGES.SLUG.MIN)
        .max(50, MESSAGES.SLUG.MAX)
        .regex(/^[a-z0-9-]+$/, MESSAGES.SLUG.REGEX),
});

export const createWorkspaceSchema = z.object({
    name: z.string().trim().min(3, MESSAGES.NAME.MIN).max(100, MESSAGES.NAME.MAX),

    slug: z
        .string()
        .trim()
        .toLowerCase()
        .min(3, MESSAGES.SLUG.MIN)
        .max(50, MESSAGES.SLUG.MAX)
        .regex(/^[a-z0-9-]+$/, MESSAGES.SLUG.REGEX),
});

export const inviteMemberSchema = z.object({
    identifier: z.enum(Object.keys(InviteIdentifier)),

    identifierValue: z.string().trim().min(1),

    role: z.enum(Object.values(WorkspaceRole)),
});
