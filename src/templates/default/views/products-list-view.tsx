import { Suspense } from "react"
import { ProductCardSkeleton } from "../components/products/product-card"
import { ProductsList } from "../components/products/products-list"

export const ProductsListView = ({ slug }: { slug: string }) => {
    return (
        <div>
            <Suspense fallback={
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            }>
                <ProductsList slug={slug} key={`products-${slug}`} />
            </Suspense>
        </div>
    )
}