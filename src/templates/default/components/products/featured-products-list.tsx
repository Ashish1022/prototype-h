"use client"

import { ProductCard } from "./product-card"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Media } from "@/payload-types"

type ProductImage = {
    image: Media
    isPrimary?: boolean | null
}

const getProductImage = (images: ProductImage[] | undefined): string | null => {
    if (!images || images.length === 0) return null

    const primaryImage = images.find(img => img.isPrimary)
    if (primaryImage?.image && typeof primaryImage.image === 'object' && 'url' in primaryImage.image) {
        return primaryImage.image.url || null
    }

    const firstImage = images[0]
    if (firstImage?.image && typeof firstImage.image === 'object' && 'url' in firstImage.image) {
        return firstImage.image.url || null
    }

    return null
}

export const FeaturedProductsList = ({ slug }: { slug: string; }) => {
    const trpc = useTRPC()

    const { data } = useSuspenseQuery(trpc.products.getFeatured.queryOptions({
        slug: slug,
    }))

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
            {data.map((product, index) => (
                <ProductCard
                    id={product.id}
                    key={product.slug}
                    name={product.name}
                    price={product.pricing.compareAtPrice}
                    originalPrice={product.pricing.price}
                    image={getProductImage(product.images)}
                    category={product.category.name}
                    badge={product.badge}
                    featured={true}
                    slug={product.slug}
                    tenantSlug={slug}
                    priority={index < 2}
                    rating={product.reviewRating}
                    reviews={product.reviewCount}
                />
            ))}
        </div>
    )
}