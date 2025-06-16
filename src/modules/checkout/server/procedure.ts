import { Category, Media } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const checkoutRouter = createTRPCRouter({
    getMany: baseProcedure
        .input(
            z.object({
                productIds: z.array(z.string())
            })
        )
        .query(async ({ ctx, input }) => {
            const data = await ctx.db.find({
                collection: "products",
                pagination: false,
                where: {
                    id: {
                        in: input.productIds
                    }
                },
                depth: 1,
                select: {
                    name: true,
                    slug: true,
                    pricing: true,
                    images: true,
                    category: true,
                    badge: true
                }
            });
            if (data.totalDocs !== input.productIds.length) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Product not found." })
            }

            const totalPrice = data.docs.reduce((acc, product) => {
                const price = Number((product.pricing.compareAtPrice ? product.pricing.compareAtPrice : product.pricing.price));
                return acc + (isNaN(price) ? 0 : price)
            }, 0);

            return {
                ...data,
                totalPrice: totalPrice,
                docs: data.docs.map(({ images, ...doc }) => {
                    const primaryImageObj = images.find(image => image.isPrimary);
                    const primaryImage = primaryImageObj?.image as Media | null;

                    return {
                        ...doc,
                        category: doc.category as Category,
                        image: primaryImage,
                    }
                })
            }
        })
})