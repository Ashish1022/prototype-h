"use client"

import { useMemo } from "react"
import { CategoryCard } from "./category-card"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { generateTenantUrl } from "@/lib/utils"

export const CategoriesList = ({ slug }: { slug: string }) => {
    const trpc = useTRPC()

    const queryOptions = useMemo(() => {
        return trpc.categories.getMany.queryOptions({
            slug: slug,
        })
    }, [trpc.categories.getMany, slug])

    const { data } = useSuspenseQuery({
        ...queryOptions,
    })

    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {data.map((category) => (
                <CategoryCard
                    key={category.slug}
                    name={category.name}
                    image={category.thumbnail.url}
                    itemCount={category.stats?.productCount}
                    href={`${generateTenantUrl(slug)}/categories/${category.slug}`}
                    description={category.description}
                />
            ))}
        </div>
    )
}