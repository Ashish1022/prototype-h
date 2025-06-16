"use client"

import { Award, Filter, Search, Star } from "lucide-react"
import Image from "next/image"
import { ProductFilters } from "../products/product-filters";
import { useState } from "react";
import EmptyProducts from "../products/empty-products";
import { ProductCard } from "../products/product-card";

import { useTRPC } from "@/trpc/client"
import { useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useProductFilters } from "@/modules/products/hooks/use-product-filter";
import { Media } from "@/payload-types";

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

export const CategoryHero = ({ category, slug }: { category: string; slug: string }) => {

    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [filters] = useProductFilters();

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.categories.getOne.queryOptions({ category: category }))
    const { data: products, hasNextPage, isFetchingNextPage, fetchNextPage } = useSuspenseInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
        {
            ...filters,
            slug: slug,
        },
        {
            getNextPageParam: (lastPage) => lastPage.docs.length > 0 ? lastPage.nextPage : undefined
        }
    ))

    return (
        <>
            <section className="relative py-20 md:py-28 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.3),transparent_50%)]"></div>
                        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-amber-500/20 to-transparent rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-transparent rounded-full blur-3xl"></div>
                    </div>
                </div>
                <div className="container px-4 md:px-6 relative mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="text-center lg:text-left">
                            {data.featured && (
                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg mb-6">
                                    <Award className="h-4 w-4" />
                                    Featured Collection
                                </div>
                            )}
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-none tracking-tight mb-4">
                                {data.name}
                            </h1>
                            <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto lg:mx-0 mb-6"></div>
                            <p className="text-lg text-stone-300 max-w-2xl leading-relaxed mb-8">{data.description}</p>
                            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0 mb-8">
                                <div className="text-center lg:text-left">
                                    <div className="text-3xl font-bold text-white mb-1">{data.stats?.productCount}</div>
                                    <div className="text-sm text-stone-400 uppercase tracking-wide">Products</div>
                                </div>
                                <div className="text-center lg:text-left">
                                    <div className="flex items-center justify-center lg:justify-start gap-1 mb-1">
                                        <span className="text-3xl font-bold text-white">{4}</span>
                                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                                    </div>
                                    <div className="text-sm text-stone-400 uppercase tracking-wide">Rating</div>
                                </div>
                                <div className="text-center lg:text-left">
                                    <div className="text-3xl font-bold text-white mb-1">2.3K</div>
                                    <div className="text-sm text-stone-400 uppercase tracking-wide">Customers</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl blur-2xl"></div>
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200 shadow-2xl">
                                    <Image
                                        src={data.thumbnail.url || "/placeholder.png"}
                                        alt={`${data.name} collection`}
                                        fill
                                        priority
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-white border-b border-stone-200 sticky top-20 z-40 shadow-sm">
                <div className="container px-4 py-4 md:px-6 mx-auto">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
                            <Button size="sm" className="bg-stone-900 hover:bg-stone-800 text-white rounded-full whitespace-nowrap">
                                All Items
                            </Button>
                            {data.subcategories.slice(0, 4).map((subcategory) => (
                                <Button
                                    key={subcategory.id}
                                    variant="outline"
                                    size="sm"
                                    className="rounded-full border-stone-300 hover:border-amber-500 hover:text-amber-600 whitespace-nowrap"
                                >
                                    {subcategory.name}
                                </Button>
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="relative hidden sm:block">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
                                <Input
                                    placeholder="Search products..."
                                    className="pl-10 w-64 rounded-full border-stone-300 focus:border-amber-500"
                                />
                            </div>
                            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="sm" className="lg:hidden rounded-full">
                                        <Filter className="h-4 w-4 mr-2" />
                                        Filter
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-[300px] bg-white">
                                    <div className="mt-8">
                                        <ProductFilters slug={slug} />
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-12">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
                        <div className="hidden lg:block">
                            <div className="sticky top-48 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                                <ProductFilters slug={slug} />
                            </div>
                        </div>
                        <div>
                            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-3xl font-bold text-stone-900 mb-2">{data.name} Collection</h2>
                                    <p className="text-stone-600">
                                        Showing {products?.pages?.[0]?.docs.length} of {data.stats?.productCount} products
                                    </p>
                                </div>
                            </div>
                            {products?.pages?.[0]?.docs.length === 0 ? (
                                <EmptyProducts
                                    description={`We couldn't find any ${data.name.toLowerCase()} products matching your current filters.`}
                                />
                            ) : (
                                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                    {products?.pages.flatMap((page) => page.docs).map((product, index) => (
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
                            )}
                            <div className="mt-16 text-center">
                                {hasNextPage && (
                                    <Button
                                        disabled={isFetchingNextPage}
                                        onClick={() => fetchNextPage()}
                                        size="lg"
                                        variant="outline"
                                        className="border-2 border-stone-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white px-12 py-6 text-lg rounded-full transition-all duration-300"
                                    >
                                        Load More Products
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div >
            </section >
        </>
    )
}

export const CategoryHeroSkeleton = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50">
            <div className="container px-4 py-16 md:px-6 md:py-24 mx-auto">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <Skeleton className="h-8 w-40 rounded-full" />
                        </div>

                        <div className="mb-6">
                            <Skeleton className="h-12 w-full mb-2 md:h-16 lg:h-20" />
                            <Skeleton className="h-8 w-32 md:h-10 lg:h-12" />
                        </div>

                        <div className="mb-8">
                            <Skeleton className="h-5 w-full mb-2" />
                            <Skeleton className="h-5 w-4/5 mb-2" />
                            <Skeleton className="h-5 w-3/5" />
                        </div>

                        <div className="flex flex-wrap gap-6 mb-8">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Skeleton key={i} className="h-4 w-4 rounded-sm" />
                                    ))}
                                </div>
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 text-center">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="p-4 rounded-lg bg-white/60 backdrop-blur-sm">
                                    <Skeleton className="h-8 w-12 mx-auto mb-1" />
                                    <Skeleton className="h-4 w-16 mx-auto" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image skeleton */}
                    <div className="relative">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200">
                            <Skeleton className="h-full w-full" />
                        </div>

                        {/* Floating elements skeleton */}
                        <div className="absolute -top-6 -right-6">
                            <Skeleton className="h-16 w-16 rounded-xl" />
                        </div>
                        <div className="absolute -bottom-6 -left-6">
                            <Skeleton className="h-16 w-16 rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}