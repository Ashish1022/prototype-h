"use client"

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { ProductCard } from "./product-card";
import { ProductFilters } from "./product-filters";
import EmptyProducts from "./empty-products";
import { Award, Filter, Search } from "lucide-react";

import { useTRPC } from "@/trpc/client"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Media } from "@/payload-types";
import { Button } from "@/components/ui/button";
import { useProductFilters } from "@/modules/products/hooks/use-product-filter";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useDebounce } from "@/modules/products/hooks/use-debounce";

type ProductImage = {
    image: Media;
    isPrimary?: boolean | null;
};

const getProductImage = (images: ProductImage[] | undefined): string | null => {
    if (!images?.length) return null

    const primaryImage = images.find(img => img.isPrimary)
    if (primaryImage?.image && typeof primaryImage.image === 'object' && 'url' in primaryImage.image) {
        return primaryImage.image.url || null;
    }

    const firstImage = images[0];
    if (firstImage?.image && typeof firstImage.image === 'object' && 'url' in firstImage.image) {
        return firstImage.image.url || null;
    }

    return null;
}

const ProductSearch = memo(({ onSearch }: { onSearch: (query: string) => void }) => {
    const [searchQuery, setSearchQuery] = useState("")
    const debouncedQuery = useDebounce(searchQuery, 300)

    useEffect(() => {
        onSearch(debouncedQuery)
    }, [debouncedQuery, onSearch])

    return (
        <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
                <Input
                    placeholder="Search for products..."
                    className="pl-12 h-14 rounded-full border-stone-300 focus:border-amber-500 bg-white shadow-sm text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
    )
})

ProductSearch.displayName = 'ProductSearch'

export const ProductsGrid = ({ slug }: { slug: string }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const [filters] = useProductFilters();
    const trpc = useTRPC();

    const queryParams = useMemo(() => ({
        slug: slug,
        ...filters,
        ...(searchQuery && { search: searchQuery })
    }), [slug, filters, searchQuery])

    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSuspenseInfiniteQuery(
        trpc.products.getMany.infiniteQueryOptions(
            queryParams,
            {
                getNextPageParam: (lastPage) => lastPage.docs.length > 0 ? lastPage.nextPage : undefined,
            }
        )
    )

    const allProducts = useMemo(() =>
        data?.pages.flatMap((page) => page.docs) || [],
        [data?.pages]
    )

    const filteredProducts = useMemo(() => {
        if (!searchQuery) return allProducts
        return allProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [allProducts, searchQuery])

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query)
    }, [])

    const handleLoadMore = useCallback(() => {
        if (!isFetchingNextPage) {
            fetchNextPage()
        }
    }, [fetchNextPage, isFetchingNextPage])

    if (data?.pages?.[0]?.docs.length === 0) {
        return (
            <div className="container px-4 pb-16 md:px-6 md:pb-24 mx-auto">
                <EmptyProducts
                    title="No products available yet"
                    description="We're working on adding products to our store. Please check back soon!"
                    showResetButton={false}
                />
            </div>
        )
    }

    return (
        <div className="container px-4 pb-16 md:px-6 md:pb-24 mx-auto">
            <ProductSearch onSearch={handleSearch} />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
                <div className="hidden lg:block">
                    <div className="sticky top-24 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                        <ProductFilters slug={slug} />
                    </div>
                </div>

                <div>
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-stone-900 mb-2">Browse Products</h2>
                            <p className="text-stone-600">
                                {filteredProducts.length} products
                                {searchQuery && ` matching "${searchQuery}"`}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="lg:hidden rounded-full border-stone-300 hover:border-stone-900"
                                    >
                                        <Filter className="h-4 w-4 mr-2" />
                                        Filters
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-full bg-white px-6">
                                    <div className="mt-8">
                                        <ProductFilters slug={slug} />
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {data?.pages.flatMap((page) => page.docs).map((product) => (
                            <ProductCard
                                id={product.id}
                                key={product.slug}
                                name={product.name}
                                price={product.pricing.compareAtPrice}
                                originalPrice={product.pricing.price}
                                image={getProductImage(product.images)}
                                category={product.category.name}
                                badge={product.badge}
                                featured={product.featured}
                                slug={product.slug}
                                tenantSlug={slug}
                            />
                        ))}
                    </div>

                    <div className="mt-12 flex justify-center">
                        {hasNextPage && !searchQuery && (
                            <Button
                                disabled={isFetchingNextPage}
                                onClick={handleLoadMore}
                                variant="outline"
                                size="lg"
                                className="min-w-[200px]"
                            >
                                {isFetchingNextPage ? 'Loading...' : 'Load More Products'}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <section className="mt-20 py-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl md:px-12 px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800 mb-4">
                        <Award className="h-4 w-4" />
                        Editor&apos;s Choice
                    </div>
                    <h2 className="text-3xl font-bold text-stone-900 mb-4">Featured This Week</h2>
                    <p className="text-xl text-stone-600 max-w-2xl mx-auto">
                        Handpicked products that showcase the best of our collection
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {data?.pages.flatMap((page) => page.docs).map((product) => (
                        product.featured && (
                            <ProductCard
                                id={product.id}
                                key={product.slug}
                                name={product.name}
                                price={product.pricing.compareAtPrice}
                                originalPrice={product.pricing.price}
                                image={getProductImage(product.images)}
                                category={product.category.name}
                                badge={product.badge}
                                featured={product.featured}
                                slug={product.slug}
                                tenantSlug={slug}
                            />
                        )
                    ))}
                </div>
            </section>
        </div>
    )
}