import { z } from "zod";

export const checkSlugSchema = z.object({
    slug: z
        .string()
        .trim()
        .min(3, "Slug must be at least 3 characters.")
        .max(50, "Slug cannot exceed 50 characters.")
        .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers and hyphens."),
});

export const createWorkspaceSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Workspace name must be at least 3 characters.")
        .max(100, "Workspace name cannot exceed 100 characters."),

    slug: z
        .string()
        .trim()
        .toLowerCase()
        .min(3, "Slug must be at least 3 characters.")
        .max(50, "Slug cannot exceed 50 characters.")
        .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers and hyphens."),
});

export const getWorkspaceStatsSchema = z.object({
    workspaceId: z.string().trim().min(1, "Workspace ID is required."),
});
