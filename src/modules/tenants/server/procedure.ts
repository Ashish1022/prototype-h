import { getTenantTemplateSchema } from "../schema";

import { TRPCError } from "@trpc/server";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import redis from "@/lib/redis";

export const tenantsRouter = createTRPCRouter({
    getTenantTemplate: baseProcedure
        .input(getTenantTemplateSchema)
        .query(async ({ ctx, input }) => {
            const tenant = await ctx.db.find({
                collection: "tenants",
                limit: 1,
                depth: 0,
                pagination: false,
                where: {
                    slug: {
                        equals: input.slug
                    }
                },
                select: {
                    activeTemplate: true
                }
            });
            if (!tenant) throw new TRPCError({ code: "NOT_FOUND", message: "Tenant not found." })
            const data = tenant.docs[0].activeTemplate as string
            return data
        }),
    getOne: baseProcedure
        .input(
            z.object({
                slug: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            const cacheKey = `tenant:${input.slug}`;
            try {
                const cached = await redis.get(cacheKey);
                if (cached) {
                    return cached;
                }
                const tenant = await ctx.db.find({
                    collection: "tenants",
                    depth: 0,
                    limit: 1,
                    pagination: false,
                    where: {
                        slug: {
                            equals: input.slug
                        }
                    },
                    select: {
                        store: true,
                        slug: true,
                    }
                });
                const data = tenant.docs[0].store
                if (!data) {
                    await redis.setex(cacheKey, 300, JSON.stringify(null));
                    return null;
                }
                await redis.setex(cacheKey, 3600, data);
                return data;
            } catch {
                const tenant = await ctx.db.find({
                    collection: "tenants",
                    depth: 0,
                    limit: 1,
                    pagination: false,
                    where: {
                        slug: {
                            equals: input.slug
                        }
                    }
                });
                const data = tenant.docs[0].store
                return data
            }
        })
})