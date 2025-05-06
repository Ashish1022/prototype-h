import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'

import { ProductList, ProductListSkeleton } from '@/modules/products/ui/components/products-list';

const page = async (props: { params: Promise<{ subcategory: string }> }) => {

    const params = await props.params;
    const subcategory = params.subcategory;

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({ category: subcategory }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<ProductListSkeleton />}>
                <ProductList category={subcategory} />
            </Suspense>
        </HydrationBoundary>
    )
}

export default page