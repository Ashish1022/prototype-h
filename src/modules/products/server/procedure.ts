import { z } from "zod";
import type { Where } from "payload";
import { sortedValues } from "../search-param";

import { Category, Media } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const productsRouter = createTRPCRouter({
    getMany: baseProcedure
        .input(
            z.object({
                search: z.string().nullable().optional(),
                cursor: z.number().default(1),
                minPrice: z.string().nullable().optional(),
                maxPrice: z.string().nullable().optional(),
                sort: z.enum(sortedValues).nullable().optional(),
                category: z.array(z.string()).nullable().optional(),
                slug: z.string().nullable().optional(),
                limit: z.number().default(4),
            })
        )
        .query(async ({ ctx, input }) => {

            const where: Where = {}
            // let sort: Sort = '-createdAt'

            // if (input.sort === 'high_to_low') {
            //     sort='pricing.price'
            // }

            if (input.slug) {
                where["tenant.slug"] = {
                    equals: input.slug
                }
            }

            if (input.minPrice && input.maxPrice) {
                where["pricing.price"] = {
                    greater_than_equal: input.minPrice,
                    less_than_equal: input.maxPrice,
                }
            } else if (input.minPrice) {
                where["pricing.price"] = {
                    greater_than_equal: input.minPrice
                }
            } else if (input.maxPrice) {
                where["pricing.price"] = {
                    less_than_equal: input.minPrice
                }
            }

            const data = await ctx.db.find({
                collection: "products",
                limit: input.limit,
                page: input.cursor,
                depth: 1,
                where: where,
                select: {
                    featured: true,
                    name: true,
                    slug: true,
                    category: true,
                    images: true,
                    description: true,
                    pricing: true,
                    badge: true,
                }
            });
            const transformedData = await Promise.all(
                data.docs.map(async (doc) => {
                    const reviewsData = await ctx.db.find({
                        collection: "reviews",
                        depth: 0,
                        pagination: false,
                        where: {
                            product: {
                                equals: doc.id
                            }
                        }
                    });
                    return {
                        ...doc,
                        images: doc.images?.map(imageItem => ({
                            ...imageItem,
                            image: imageItem.image as Media,
                        })) || [],
                        category: doc.category as Category,
                        reviewCount: reviewsData.totalDocs,
                        reviewRating: reviewsData.docs.length === 0 ? 0 :
                            reviewsData.docs.reduce((acc, review) => acc + review.rating, 0) / reviewsData.totalDocs
                    };
                })
            );

            return {
                ...data,
                docs: transformedData
            }
        }),
    getOne: baseProcedure
        .input(
            z.object({
                product: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            const product = await ctx.db.find({
                collection: "products",
                limit: 1,
                depth: 1,
                pagination: false,
                where: {
                    slug: {
                        equals: input.product
                    }
                },
                select: {
                    name: true,
                    images: true,
                    description: true,
                    pricing: true,
                    slug: true,
                    badge: true,
                    inventory: true,
                    category: true,
                    specifications: true,
                    variants: true,
                    shipping: true,
                    refundPolicy: true,
                }
            });
            const data = product.docs[0]

            const review = await ctx.db.find({
                collection: "reviews",
                pagination: false,
                where: {
                    product: {
                        equals: data.id
                    }
                }
            })
            const reviewRating = review.docs.length > 0 ? review.docs.reduce((acc, review) => acc + review.rating, 0) / review.totalDocs : 0;
            const ratingDistribution: Record<number, number> = {
                5: 0,
                4: 0,
                3: 0,
                2: 0,
                1: 0,
            };

            if (review.totalDocs > 0) {
                review.docs.forEach((review) => {
                    const rating = review.rating
                    if (rating >= 1 && rating <= 5) ratingDistribution[rating] = (ratingDistribution[rating] || 0) + 1;
                });
                Object.keys(ratingDistribution).forEach((key) => {
                    const rating = Number(key);
                    const count = ratingDistribution[rating] || 0;
                    ratingDistribution[rating] = Math.round(
                        (count / review.totalDocs) * 100,
                    )
                })
            }

            return {
                ...data,
                images: data.images?.map(imageItem => ({
                    ...imageItem,
                    image: imageItem.image as Media,
                })) || [],
                category: data.category as Category,
                reviewRating,
                reviewCount: review.totalDocs,
                reviews: review.docs,
                ratingDistribution,
            }
        }),
})