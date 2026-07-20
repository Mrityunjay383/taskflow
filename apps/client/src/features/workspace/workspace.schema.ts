import z from "zod";

export const onboardingSchema = z.object({
    name: z.string().min(2, "Workspace name must be at least 2 characters").max(48),
    slug: z
        .string()
        .min(2, "Slug must be at least 2 characters")
        .max(48)
        .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens"),
});
