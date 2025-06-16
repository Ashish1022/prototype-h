import React from 'react'

import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ProductView } from '@/templates/default/views/product-view';

interface Props {
    params: Promise<{ slug: string; product: string }>
}

const Product = async ({ params }: Props) => {

    const { slug, product } = await params;

    const queryClient = getQueryClient();
    await Promise.all([
        void queryClient.prefetchQuery(trpc.products.getOne.queryOptions({ product: product })),
        void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({ slug: slug }))
    ])

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductView slug={slug} product={product} />
        </HydrationBoundary>
    )
}

export default Product