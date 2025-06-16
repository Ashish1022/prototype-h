import React, { Suspense } from 'react'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient, trpc } from '@/trpc/server';
import { HeroSectionSkeleton, HomeView } from '@/templates/default/views/home-view';

interface Props {
    params: Promise<{ slug: string }>
}

const TenantPage = async ({ params }: Props) => {

    const { slug } = await params;

    const queryClient = getQueryClient();

    await Promise.all([
        queryClient.prefetchQuery(trpc.categories.getMany.queryOptions({
            slug: slug,
        })),
        queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
            slug: slug,
        }))
    ])

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<HeroSectionSkeleton />}>
                <HomeView slug={slug} />
            </Suspense>
        </HydrationBoundary>
    )
}

export default TenantPage