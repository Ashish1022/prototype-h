"use client"

import Link from 'next/link'
import React from 'react'
import { useCart } from '../../hooks/use-cart'
import { CartItem } from '../components/cart-item'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { generateTenantUrl } from '@/lib/utils'
import { ArrowRight, Gift, ShoppingBag } from 'lucide-react'

export const CartView = ({ slug }: { slug: string }) => {

    const { totalItems, cartItems, incrementQuantity, decrementQuantity, getProductQuantity, removeProduct } = useCart(slug);

    const productIds = cartItems.map((item) => (
        item.productId
    ));

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.checkout.getProducts.queryOptions({ productIds: productIds }))

    const totalPrice = data?.docs.reduce((acc, product) => {
        const quantity = getProductQuantity(product.id);
        const unitPrice = product.pricing?.compareAtPrice || 0;
        return acc + unitPrice * quantity;
    }, 0);

    return (
        <div className="bg-gradient-to-b from-stone-50 to-white">
            <div className="container px-2 py-8 md:px-6 md:py-12 mx-auto">
                <div className="mb-8 flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">Your Shopping Cart</h1>
                    <p className="text-gray-500">{totalItems} items in your cart</p>
                </div>
                {totalItems > 0 ? (
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <div className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden">
                                <div className="hidden border-b border-stone-200 p-4 sm:grid sm:grid-cols-6">
                                    <div className="col-span-3 font-medium text-stone-900">Product</div>
                                    <div className="font-medium text-stone-900">Price</div>
                                    <div className="font-medium text-stone-900">Quantity</div>
                                    <div className="font-medium text-stone-900">Total</div>
                                </div>
                                {data?.docs.map((product) => (
                                    <CartItem
                                        id={product.id}
                                        key={product.id}
                                        image={product.image?.url}
                                        name={product.name}
                                        price={product.pricing?.compareAtPrice ? product.pricing.compareAtPrice : product.pricing.price}
                                        productQuantity={getProductQuantity(product.id)}
                                        incrementQuantity={incrementQuantity}
                                        decrementQuantity={decrementQuantity}
                                        removeProduct={removeProduct}
                                    />
                                ))}
                            </div>
                            <div className="mt-6 flex justify-between">
                                <Button
                                    variant="outline"
                                    asChild
                                    className="border-stone-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white rounded-full transition-all duration-300"
                                >
                                    <Link href={`${generateTenantUrl(slug)}/products`} className="flex items-center gap-2">Continue Shopping</Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-stone-300 hover:border-amber-600 hover:bg-amber-600 hover:text-white rounded-full transition-all duration-300"
                                >
                                    Update Cart
                                </Button>
                            </div>
                        </div>
                        <div>
                            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-lg font-bold text-stone-900">Order Summary</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="text-stone-900">${totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="text-gray-600">Calculated at next step</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tax</span>
                                        <span className="text-stone-900">${(totalPrice * 0.14).toFixed(2)}</span>
                                    </div>
                                    <Separator className="my-3" />
                                    <div className="flex justify-between font-medium">
                                        <span className="text-stone-900">Total</span>
                                        <span className="text-xl font-bold text-stone-900">${(totalPrice + (totalPrice * 0.14))}</span>
                                    </div>
                                </div>
                                <Button
                                    className="mt-6 w-full bg-stone-900 hover:bg-amber-600 text-white rounded-full transition-all duration-300 transform hover:scale-105"
                                    asChild
                                >
                                    <Link href={`${generateTenantUrl(slug)}/checkout`} className="flex items-center justify-center gap-2"> Proceed to Checkout
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                                <div className="mt-6 space-y-4">
                                    <h3 className="font-medium text-stone-900">Have a Promo Code?</h3>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Gift className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
                                            <Input
                                                placeholder="Enter code"
                                                className="pl-10 rounded-full border-stone-300 focus:border-amber-500"
                                            />
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="rounded-full border-stone-300 hover:border-amber-600 hover:bg-amber-600 hover:text-white transition-all duration-300"
                                        >
                                            Apply
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-stone-200 bg-white py-16 text-center shadow-sm">
                        <div className="relative w-32 h-32 mb-6">
                            <div className="absolute inset-0 bg-amber-100 rounded-full opacity-50 animate-pulse"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <ShoppingBag className="h-16 w-16 text-amber-500" strokeWidth={1.5} />
                            </div>
                        </div>
                        <h2 className="mb-2 text-2xl font-bold text-stone-900">Your cart is empty</h2>
                        <p className="mb-8 text-stone-600">Looks like you haven&apos;t added any products to your cart yet.</p>
                        <Button
                            asChild
                            className="bg-stone-900 hover:bg-amber-600 text-white rounded-full px-8 py-6 transition-all duration-300 transform hover:scale-105"
                        >
                            <Link href={`${generateTenantUrl(slug)}/products`} className="flex items-center gap-2">
                                Start Shopping
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export function CartLoading() {
    return (
        <main>
            <div className="container px-4 py-8 md:px-6 md:py-12">
                <div className="mb-8 flex flex-col gap-2">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-5 w-32" />
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="rounded-lg border">
                            <div className="hidden border-b p-4 sm:grid sm:grid-cols-6">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-12" />
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-12" />
                            </div>

                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="grid grid-cols-1 border-b p-4 sm:grid-cols-6 sm:items-center">
                                    <div className="col-span-3 flex items-center gap-4">
                                        <Skeleton className="h-20 w-20 rounded-md" />
                                        <div>
                                            <Skeleton className="h-5 w-32 mb-1" />
                                            <Skeleton className="h-4 w-16 sm:hidden" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-4 w-12 hidden sm:block" />
                                    <div className="mt-4 sm:mt-0">
                                        <Skeleton className="h-8 w-32" />
                                    </div>
                                    <div className="mt-4 flex items-center justify-between sm:mt-0 sm:justify-start">
                                        <Skeleton className="h-5 w-16" />
                                        <Skeleton className="h-8 w-8" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-between">
                            <Skeleton className="h-10 w-32" />
                            <Skeleton className="h-10 w-24" />
                        </div>
                    </div>

                    <div>
                        <div className="rounded-lg border p-6">
                            <Skeleton className="h-6 w-32 mb-4" />

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-4 w-12" />
                                </div>
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-4 w-12" />
                                </div>
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-8" />
                                    <Skeleton className="h-4 w-12" />
                                </div>
                                <div className="w-full h-px bg-stone-200" />
                                <div className="flex justify-between">
                                    <Skeleton className="h-5 w-12" />
                                    <Skeleton className="h-5 w-16" />
                                </div>
                            </div>

                            <Skeleton className="mt-6 h-12 w-full rounded-full" />

                            <div className="mt-6">
                                <Skeleton className="h-5 w-24 mb-2" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-10 flex-1" />
                                    <Skeleton className="h-10 w-16" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
