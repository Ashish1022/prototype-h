import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'

import { ProductList, ProductListSkeleton } from '@/modules/products/ui/components/products-list';

const page = async (props: { params: Promise<{ category: string }> }) => {

    const params = await props.params;
    const category = params.category;

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({ category }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<ProductListSkeleton />}>
                <ProductList category={category}/>
            </Suspense>
        </HydrationBoundary>
    )
}

export default page