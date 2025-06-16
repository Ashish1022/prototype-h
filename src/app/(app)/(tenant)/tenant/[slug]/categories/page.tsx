import React from 'react'

import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { CategoriesListView } from '@/templates/default/views/categories-list-view';

interface Props {
    params: Promise<{ slug: string }>
}

const CategoriesPage = async ({ params }: Props) => {

    const { slug } = await params;
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions({
        slug: slug,
    }))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CategoriesListView slug={slug} />
        </HydrationBoundary>
    )
}

export default CategoriesPage