import { memo } from "react"
import { ArrowRight, Award, Sparkles } from "lucide-react"
import { Background } from "../components/background"
import Link from "next/link"
import { CategoriesListView } from "./categories-list-view"

import { Button } from "@/components/ui/button"
import { ProductsListView } from "./products-list-view"

const HERO_STATS = [
    { value: "10K+", label: "Happy Customers" },
    { value: "500+", label: "Unique Products" },
    { value: "50+", label: "Countries Served" }
] as const

export const HeroSectionSkeleton = memo(() => (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50 py-16">

        <div className="relative flex flex-col items-center justify-center px-4 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-medium shadow-lg">
                <div className="h-4 w-4 rounded-full bg-stone-300 animate-pulse flex-shrink-0" />
                <div className="h-4 w-40 bg-stone-300 rounded animate-pulse" />
            </div>

            <h1 className="mb-6 max-w-4xl font-bold tracking-tight leading-[1.1] flex flex-col items-center" style={{
                fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
                minHeight: 'clamp(5rem, 12vw, 10rem)'
            }}>
                <div className="bg-stone-300 rounded animate-pulse mb-2" style={{
                    width: 'clamp(12rem, 30vw, 24rem)',
                    height: 'clamp(2.25rem, 5vw, 4.5rem)'
                }} />
                <div className="bg-stone-300 rounded animate-pulse" style={{
                    width: 'clamp(14rem, 35vw, 28rem)',
                    height: 'clamp(2.25rem, 5vw, 4.5rem)'
                }} />
            </h1>

            <div className="mb-8 max-w-2xl leading-relaxed flex flex-col items-center gap-2" style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
            }}>
                <div className="bg-stone-300 rounded animate-pulse" style={{
                    width: 'clamp(20rem, 50vw, 32rem)',
                    height: 'clamp(1rem, 2.5vw, 1.25rem)'
                }} />
                <div className="bg-stone-300 rounded animate-pulse" style={{
                    width: 'clamp(16rem, 40vw, 28rem)',
                    height: 'clamp(1rem, 2.5vw, 1.25rem)'
                }} />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row items-center justify-center">
                <div className="bg-stone-300 rounded-full animate-pulse px-8 py-4 text-lg shadow-xl" style={{
                    width: 'clamp(12rem, 30vw, 16rem)',
                    height: '3.5rem'
                }} />
            </div>

            <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 text-center w-full max-w-md">
                {[1, 2, 3].map((index) => (
                    <div key={index} className="flex flex-col items-center justify-center">
                        <div className="mb-2 leading-tight" style={{
                            fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                            minHeight: 'clamp(1.75rem, 4vw, 2rem)'
                        }}>
                            <div className="bg-stone-300 rounded animate-pulse mx-auto" style={{
                                width: 'clamp(2rem, 5vw, 3rem)',
                                height: 'clamp(1.25rem, 3vw, 1.5rem)'
                            }} />
                        </div>
                        <div className="leading-tight" style={{
                            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                            minHeight: 'clamp(1rem, 2.5vw, 1.25rem)'
                        }}>
                            <div className="bg-stone-300 rounded animate-pulse mx-auto" style={{
                                width: 'clamp(3rem, 8vw, 5rem)',
                                height: 'clamp(0.75rem, 2vw, 0.875rem)'
                            }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
))

HeroSectionSkeleton.displayName = 'HeroSectionSkeleton'

const HeroSection = memo(({ slug }: { slug: string }) => (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50 py-16">
        <Background />
        <div className="relative flex flex-col items-center justify-center px-4 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-stone-700 shadow-lg">
                <Sparkles className="h-4 w-4 text-amber-500 flex-shrink-0" />
                <span className="whitespace-nowrap">New Collection Available</span>
            </div>
            <h1 className="mb-6 max-w-4xl font-bold tracking-tight text-stone-900 leading-[1.1]" style={{
                fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
                minHeight: 'clamp(5rem, 12vw, 10rem)'
            }}>
                <span className="block">Product That</span>
                <span className="block bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Speaks to You
                </span>
            </h1>
            <p className="mb-8 max-w-2xl text-stone-600 leading-relaxed flex items-center" style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
            }}>
                Thoughtfully crafted pieces that transform your space into a sanctuary of style and comfort
            </p>
            <div className="flex flex-col gap-4 sm:flex-row items-center justify-center">
                <Button
                    size="lg"
                    className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    asChild
                >
                    <Link href={`${slug}/products`} className="flex items-center gap-2 whitespace-nowrap">
                        Explore Collection
                        <ArrowRight className="h-5 w-5 flex-shrink-0" />
                    </Link>
                </Button>
            </div>
            <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 text-center w-full max-w-md">
                {HERO_STATS.map(({ value, label }) => (
                    <div key={label} className="flex flex-col items-center justify-center">
                        <div className="mb-2 font-bold text-stone-900 leading-tight" style={{
                            fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                            minHeight: 'clamp(1.75rem, 4vw, 2rem)'
                        }}>
                            {value}
                        </div>
                        <div className="text-stone-600 leading-tight" style={{
                            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                            minHeight: 'clamp(1rem, 2.5vw, 1.25rem)'
                        }}>
                            {label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
))

HeroSection.displayName = 'HeroSection'

const CategorySection = memo(({ slug }: { slug: string }) => (
    <section className="py-16 sm:py-20 bg-white">
        <div className="container px-4 mx-auto max-w-7xl">
            <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-4">Shop by Lifestyle</h2>
                <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto">
                    Find pieces that match your unique style and transform your everyday moments
                </p>
            </div>
            <CategoriesListView slug={slug} />
        </div>
    </section>
))

CategorySection.displayName = 'CategorySection'

const ProductsSection = memo(({ slug }: { slug: string }) => (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-stone-50 to-white">
        <div className="container px-4 max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800 mb-4">
                    <Award className="h-4 w-4" />
                    Editor&apos;s Choice
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-4">This Week&apos;s Favorites</h2>
                <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto">Handpicked pieces that our community loves most</p>
            </div>
            <ProductsListView slug={slug} />
        </div>
    </section>
))

ProductsSection.displayName = 'ProductsSection'


export const HomeView = ({ slug }: { slug: string }) => {
    return (
        <div className="flex flex-col">
            <HeroSection slug={slug} />
            <CategorySection slug={slug} />
            <ProductsSection slug={slug} />
        </div>
    )
}