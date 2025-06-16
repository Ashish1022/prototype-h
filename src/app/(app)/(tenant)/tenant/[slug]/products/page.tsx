import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProductsView } from "@/templates/default/views/products-view";

interface Props {
    params: Promise<{ slug: string }>
}

const Products = async ({ params }: Props) => {

    const { slug } = await params;

    const queryClient = getQueryClient();
    void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({ slug: slug }))
    void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions({ slug: slug }))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductsView slug={slug} />
        </HydrationBoundary>
    )
}

export default Products