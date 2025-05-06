"use client"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";

export const ProductList = ({ category }: { category?: string }) => {
    console.log(category)
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.products.getMany.queryOptions({ category }));

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}

export const ProductListSkeleton = () => {
    return (
        <div>
            Loading...
        </div>
    )
}