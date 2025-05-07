import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React from 'react'
import type { SearchParams } from 'nuqs/server';

import { loadProductFilters } from '@/modules/products/search-param';
import { ProductListView } from '@/modules/products/ui/views/product-list-view';

const page = async (props: { params: Promise<{ category: string }>, searchParams: Promise<SearchParams> }) => {

    const params = await props.params;
    const category = params.category;

    const filters = await loadProductFilters(props.searchParams);

    const queryClient = getQueryClient();
    void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
        {
            ...filters,
            category,
            limit: 8
        },
    ));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView category={category} />
        </HydrationBoundary>
    )
}

export default page