import { memo, Suspense } from "react"
import { CategoryCard, CategoryCardSkeleton } from "../components/categories/category-card"
import { CategoriesList } from "../components/categories/categories-list"
import { ArrowRight, Sparkles } from "lucide-react"
import { caller } from "@/trpc/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { generateTenantUrl } from "@/lib/utils"
import EmptyCategories from "../components/categories/empty-category"

const HeroSection = memo(() => (
    <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('/placeholder.png')] bg-cover bg-center" />

        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-orange-200/40 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="container relative px-4 md:px-6 mx-auto">
            <div className="mx-auto max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-stone-700 shadow-lg mb-6">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    Explore Our Collections
                </div>
                <h1 className="mb-8 text-4xl font-bold tracking-tight text-stone-900 md:text-5xl lg:text-6xl">
                    Shop by
                    <span className="block py-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                        Category
                    </span>
                </h1>
                <p className="mb-8 text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto">
                    Discover thoughtfully curated collections designed for every space in your home
                </p>
            </div>
        </div>
    </section>
))

HeroSection.displayName = 'HeroSection'

const CTASection = memo(({ slug }: { slug: string }) => (
    <section className="mt-20 py-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl text-center">
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Can&apos;t Find What You&apos;re Looking For?</h2>
            <p className="text-xl text-stone-600 mb-8">
                Browse our complete product collection or get in touch with our design experts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                    size="lg"
                    className="bg-stone-900 hover:bg-amber-600 text-white rounded-full px-8 py-6 transition-all duration-300 transform hover:scale-105"
                    asChild
                >
                    <Link href={`${generateTenantUrl(slug)}/products`} prefetch={false}>
                        Browse All Products
                        <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                </Button>
                <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-stone-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white rounded-full px-8 py-6 transition-all duration-300"
                    asChild
                >
                    <Link href={`${generateTenantUrl(slug)}/contact`} prefetch={false}>Contact Us</Link>
                </Button>
            </div>
        </div>
    </section>
))

CTASection.displayName = 'CTASection'

const FeaturedCategoriesSection = memo(({
    featuredCategories,
    slug
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    featuredCategories: Array<any>,
    slug: string
}) => (
    <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
            <div>
                <h2 className="text-3xl font-bold text-stone-900 mb-2">Featured Collections</h2>
                <p className="text-stone-600">Our most popular and trending categories</p>
            </div>
            <Button
                variant="outline"
                className="hidden sm:flex border-stone-300 hover:border-amber-600 hover:bg-amber-50 hover:text-amber-700 rounded-full"
                asChild
            >
                <Link href={`${generateTenantUrl(slug)}/products`} prefetch={false}>
                    View All Products
                    <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
            </Button>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {featuredCategories.map((category) => (
                <CategoryCard
                    key={category.slug}
                    name={category.name}
                    image={category.thumbnail.url}
                    itemCount={category.stats?.productCount}
                    href={`${generateTenantUrl(slug)}/categories/${category.slug}`}
                    description={category.description}
                />
            ))}
        </div>
    </section>
))

FeaturedCategoriesSection.displayName = 'FeaturedCategoriesSection'

const CategoriesListSkeleton = memo(() => (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
            <CategoryCardSkeleton key={i} />
        ))}
    </div>
))

CategoriesListSkeleton.displayName = 'CategoriesListSkeleton'


export const CategoriesListView = async ({ slug }: { slug: string }) => {
    const categories = await caller.categories.getMany({ slug: slug })

    const featuredCategories = categories.filter((category) => category.featured)

    return (
        <div className="bg-gradient-to-b from-stone-50 to-white min-h-screen">
            <HeroSection />

            <div className="container px-4 pb-20 md:px-6 md:pb-28 mx-auto">
                {categories.length === 0 ? (
                    <EmptyCategories />
                ) : (
                    <>
                        {featuredCategories.length > 0 && (
                            <FeaturedCategoriesSection
                                featuredCategories={featuredCategories}
                                slug={slug}
                            />
                        )}

                        <section>
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-stone-900 mb-2">All Categories</h2>
                                <p className="text-stone-600">Browse our complete collection of product categories</p>
                            </div>

                            <Suspense fallback={<CategoriesListSkeleton />}>
                                <CategoriesList slug={slug} key={`categories-${slug}`} />
                            </Suspense>
                        </section>

                        <CTASection slug={slug} />
                    </>
                )}
            </div>
        </div>
    )
}