"use client"

import { useTRPC } from "@/trpc/client"
import { useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useProductFilters } from "../../hooks/use-product-filter";
import { ProductCard, ProductCardSkeleton } from "./product-card";
import { Button } from "@/components/ui/button";
import { InboxIcon } from "lucide-react";

export const ProductList = ({ category }: { category?: string }) => {

    const [filters] = useProductFilters();

    const trpc = useTRPC();
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSuspenseInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
        {
            category,
            ...filters,
        }, {
        getNextPageParam: (lastpage) => {
            return lastpage.docs.length > 0 ? lastpage.nextPage : undefined
        }
    }
    ));

    if (data?.pages?.[0]?.docs.length === 0) {
        return (
            <div className="border border-black border-dashed flex justify-center items-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
                <InboxIcon />
                <p className="text-base font-medium">No products found.</p>
            </div>
        )
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {data?.pages.flatMap((page) => page.docs).map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.image?.url}
                        authorUsername="ashish"
                        authorImageUrl={undefined}
                        reviewRating={3}
                        reviewCount={5}
                        price={product.price}
                    />
                ))}
            </div>
            <div className="flex justify-center pt-8">
                {hasNextPage && (
                    <Button className="font-medium disabled:opacity-50 text-base bg-white" variant="elevated" disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
                        Load more...
                    </Button>
                )}
            </div>
        </>
    )
}

export const ProductListSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index}/>
            ))}
        </div>
    )
}