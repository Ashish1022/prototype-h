import { z } from "zod";

export const getTenantTemplateSchema = z.object({
    slug: z.string()
})