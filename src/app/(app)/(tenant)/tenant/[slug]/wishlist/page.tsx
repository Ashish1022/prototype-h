import WishlistLoading, { WishlistView } from '@/templates/default/views/wishlist-views';
import React, { Suspense } from 'react'

interface Props {
    params: Promise<{ slug: string }>
}

const page = async ({ params }: Props) => {

    const { slug } = await params;

    return (
        <Suspense fallback={<WishlistLoading />}>
            <WishlistView slug={slug} />
        </Suspense>
    )
}

export default page