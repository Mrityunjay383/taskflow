import { z } from "zod";

export const checkSlugSchema = z.object({
    slug: z
        .string()
        .trim()
        .min(3, "Slug must be at least 3 characters.")
        .max(50, "Slug cannot exceed 50 characters.")
        .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers and hyphens."),
});
