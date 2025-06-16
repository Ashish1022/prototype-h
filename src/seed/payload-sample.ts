import { payload } from "@/lib/payload";

async function debugQuery() {
    try {
        const data = await payload.find({
            collection: "products",
            limit: 4,
            page: 1,
            depth: 1,
            where: {
                "tenant.slug": {
                    equals: 'cactus'
                }
            },
            select: {
                featured: true,
                name: true,
                slug: true,
                description: true,
                category: true,
                pricing: {
                    price: true,
                    compareAtPrice: true
                },
                badge: true,
            },
        });
        console.log(data.docs[0])
    } catch (error) {
        console.error("Error:", error);
    }
}

debugQuery();