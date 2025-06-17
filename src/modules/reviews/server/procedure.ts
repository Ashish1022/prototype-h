import { reviewSchema } from "../schema";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

export const reviewsRouter = createTRPCRouter({
    create: baseProcedure
        .input(reviewSchema)
        .mutation(async ({ ctx, input }) => {
            const product = await ctx.db.find({
                collection: "products",
                limit: 1,
                depth: 0,
                pagination: false,
                where: {
                    slug: {
                        equals: input.product
                    }
                },
                select: {
                    images: false,
                    inventory: false,
                    name: false,
                    slug: false,
                    content: false,
                    category: false,
                    tenant: false,
                }
            });
            console.log(product.docs[0])
            if (!product.docs[0] || product.docs.length === 0) throw new TRPCError({ code: "NOT_FOUND", message: "Product not found." });

            const review = await ctx.db.create({
                collection: "reviews",
                data: {
                    product: product.docs[0].id,
                    name: input.name,
                    email: input.email || '',
                    description: input.description,
                    title: input.title,
                    rating: input.rating
                }
            });
            return review
        }),
})