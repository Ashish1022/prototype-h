import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React from 'react'
import type { SearchParams } from 'nuqs/server';

import { loadProductFilters } from '@/modules/products/search-param';
import { ProductListView } from '@/modules/products/ui/views/product-list-view';

const page = async (props: { searchParams: Promise<SearchParams> }) => {

  const filters = await loadProductFilters(props.searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
    {
      ...filters,
      limit: 8
    },
  ));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView />
    </HydrationBoundary>
  )
}

export default page