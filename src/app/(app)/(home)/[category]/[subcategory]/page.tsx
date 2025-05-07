import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React from 'react'
import { SearchParams } from 'nuqs/server';

import { ProductListView } from '@/modules/products/ui/views/product-list-view';
import { loadProductFilters } from '@/modules/products/search-param';

const page = async (props: { params: Promise<{ subcategory: string }>, searchParams: Promise<SearchParams> }) => {

    const params = await props.params;
    const subcategory = params.subcategory;

    const filters = await loadProductFilters(props.searchParams);

    const queryClient = getQueryClient();
    void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
        ...filters,
        category: subcategory,
        limit: 8
    }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView category={subcategory} />
        </HydrationBoundary>
    )
}

export default page