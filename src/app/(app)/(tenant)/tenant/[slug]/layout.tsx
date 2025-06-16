import React, { Suspense } from 'react'

import '@/templates/default/style.css'
import { getQueryClient, trpc } from '@/trpc/server'
import { Footer, FooterSkeleton } from "@/templates/default/components/footer";
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Header, HeaderSkeleton } from '@/templates/default/components/header';

interface Props {
    children: React.ReactNode;
    params: Promise<{ slug: string }>
}

const TenantLayout = async ({ children, params }: Props) => {

    const { slug } = await params

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({ slug: slug }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<HeaderSkeleton />}>
                <Header slug={slug} />
            </Suspense>
            <main className='min-h-screen'>
                {children}
            </main >
            <Suspense fallback={<FooterSkeleton />}>
                <Footer slug={slug} />
            </Suspense>
        </HydrationBoundary>
    )
}

export default TenantLayout