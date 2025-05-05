import { Footer } from "@/modules/home/ui/components/footer";
import { Navbar } from "@/modules/home/ui/components/navbar";
import { SearchFilters, SearchFiltersSkeleton } from "@/modules/home/ui/components/search-filters";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.categories.getMany.queryOptions()
    );

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<SearchFiltersSkeleton />}>
                    <SearchFilters />
                </Suspense>
            </HydrationBoundary>
            <main className='flex-1 bg-[#f4f4f0]'>
                {children}
            </main>
            <Footer />
        </div>

    );
};