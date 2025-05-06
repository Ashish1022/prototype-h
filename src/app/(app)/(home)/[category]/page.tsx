import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'
import type { SearchParams } from 'nuqs/server';

import { ProductList, ProductListSkeleton } from '@/modules/products/ui/components/products-list';
import { ProductFilters } from '@/modules/products/ui/components/product-filters';
import { loadProductFilters } from '@/modules/products/search-param';
import { ProductsSort } from '@/modules/products/ui/components/products-sort';

const page = async (props: { params: Promise<{ category: string }>, searchParams: Promise<SearchParams> }) => {

    const params = await props.params;
    const category = params.category;

    const filters = await loadProductFilters(props.searchParams);

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
        category,
        ...filters
    }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className='px-4 lg:px-12 py-8 flex flex-col gap-4'>
                <div className='flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 justify-between'>
                    <p className='text-2xl font-medium'>Curated for you</p>
                    <ProductsSort />
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12'>
                    <div className='lg:col-span-2 xl:col-span-2'>
                        <ProductFilters />
                    </div>
                    <div className='lg:col-span-4 xl:col-span-6'>
                        <Suspense fallback={<ProductListSkeleton />}>
                            <ProductList category={category} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </HydrationBoundary>
    )
}

export default page