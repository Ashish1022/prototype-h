import React from 'react'

import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { CategoryView } from '@/templates/default/views/category-view';
import { loadProductFilters } from '@/modules/products/search-param';
import { SearchParams } from 'nuqs/server';

interface Props {
    params: Promise<{ slug: string; category: string }>
    searchParams: Promise<SearchParams>
}

const CategoryPage = async ({ params, searchParams }: Props) => {

    const { slug, category } = await params;

    const filters = await loadProductFilters(searchParams);

    const queryClient = getQueryClient();
    await Promise.all([
        void queryClient.prefetchQuery(trpc.categories.getOne.queryOptions({ category: category })),
        void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
            {
                ...filters,
                limit: 8
            },
        ))
    ])

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CategoryView slug={slug} category={category} />
        </HydrationBoundary>
    )
}

export default CategoryPage