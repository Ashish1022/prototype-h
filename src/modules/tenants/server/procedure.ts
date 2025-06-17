import { z } from "zod";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

export const tenantsRouter = createTRPCRouter({
    getOne: baseProcedure
        .input(
            z.object({
                slug: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            const tenant = await ctx.db.find({
                collection: "tenants",
                pagination: false,
                limit: 1,
                depth: 0,
                where: {
                    slug: {
                        equals: input.slug
                    }
                },
                select: {
                    store: true,
                }
            })
            if (!tenant) throw new TRPCError({ code: "NOT_FOUND", message: "Tenant not found!" })
            const data = tenant.docs[0]
            return data
        })
})