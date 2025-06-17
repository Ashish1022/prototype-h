import { string, z } from "zod";

import { Category, Media } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
    getMany: baseProcedure
        .input(
            z.object({
                slug: z.string(),
                search: z.string().nullable().optional(),
                cursor: z.number().default(1),
                limit: z.number().default(12),
            })
        )
        .query(async ({ ctx, input }) => {
            const data = await ctx.db.find({
                collection: "categories",
                limit: input.limit,
                page: input.cursor,
                depth: 1,
                where: {
                    tenantSlug: {
                        equals: input.slug
                    }
                },
                select: {
                    name: true,
                    slug: true,
                    "stats.productCount": true,
                    featured: true,
                    thumbnail: true,
                    subcategories: true,
                    description: true,
                },
                sort: 'name'
            });

            const transformedData = data.docs.map((doc) => ({
                ...doc,
                subcategories: (doc.subcategories?.docs ?? []).map((subdoc) => ({
                    ...(subdoc as Category)
                })),
                thumbnail: doc.thumbnail as Media
            }));

            return {
                ...data,
                docs: transformedData
            }
        }),
    getFeatured: baseProcedure
        .input(
            z.object({
                slug: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            const categories = await ctx.db.find({
                collection: "categories",
                limit: 8,
                pagination: false,
                depth: 1,
                where: {
                    and: [
                        {
                            tenantSlug: {
                                equals: input.slug
                            }
                        },
                        {
                            featured: {
                                equals: true
                            }
                        }
                    ]
                },
                select: {
                    name: true,
                    slug: true,
                    "stats.productCount": true,
                    thumbnail: true,
                    subcategories: true,
                    description: true,
                },
                sort: 'name'
            });

            const data = categories.docs.map((doc) => ({
                ...doc,
                subcategories: (doc.subcategories?.docs ?? []).map((subdoc) => ({
                    ...(subdoc as Category)
                })),
                thumbnail: doc.thumbnail as Media
            }));

            return data
        }),
    getOne: baseProcedure
        .input(
            z.object({
                category: z.string(),
                slug: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            const category = await ctx.db.find({
                collection: "categories",
                limit: 1,
                pagination: false,
                depth: 1,
                where: {
                    and: [
                        {
                            tenantSlug: {
                                equals: input.slug
                            }
                        },
                        {
                            slug: {
                                equals: input.category
                            }
                        }
                    ]
                },
                select: {
                    subcategories: true,
                    slug: true,
                    name: true,
                    stats: true,
                    description: true,
                    thumbnail: true,
                    featured: true
                }
            });

            const data = category.docs.map((doc) => ({
                ...doc,
                subcategories: (doc.subcategories?.docs ?? []).map((subdoc) => ({
                    ...(subdoc as Category),
                })),
                thumbnail: doc.thumbnail as Media
            }));

            return data[0]
        })
})