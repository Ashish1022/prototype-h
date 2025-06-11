"use client"

import { Star, X } from "lucide-react"
import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Checkbox } from "@/components/ui/checkbox"
import { useProductFilters } from "@/modules/products/hooks/use-product-filter"
import { useDebounce } from "@/modules/products/hooks/use-debounce"

export const ProductFilters = ({ slug }: { slug: string }) => {

    const [, setFilters] = useProductFilters();

    const [priceRange, setPriceRange] = useState([0, 2000])
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedRating, setSelectedRating] = useState<number | null>(null)

    const debouncedPriceRange = useDebounce(priceRange, 300)

    const trpc = useTRPC();
    const { data: categories } = useSuspenseQuery(trpc.categories.getMany.queryOptions({ tenantSlug: slug }))

    useEffect(() => {
        setFilters(prevFilters => ({
            ...prevFilters,
            minPrice: debouncedPriceRange[0] > 0 ? debouncedPriceRange[0].toString() : "",
            maxPrice: debouncedPriceRange[1] < 2000 ? debouncedPriceRange[1].toString() : "",
            category: selectedCategories
        }));
    }, [debouncedPriceRange, selectedCategories, setFilters]);

    const handleSliderChange = (value: number[]) => {
        setPriceRange(value);
    };

    const handleCategoryChange = (categorySlug: string, checked: boolean) => {
        if (checked) {
            setSelectedCategories([...selectedCategories, categorySlug])
        } else {
            setSelectedCategories(selectedCategories.filter((slug) => slug !== categorySlug))
        }
    }

    const activeFiltersCount =
        selectedCategories.length +
        (selectedRating ? 1 : 0) +
        (priceRange[0] > 0 || priceRange[1] < 2000 ? 1 : 0)

    const clearFilters = () => {
        setPriceRange([0, 2000])
        setSelectedCategories([])
        setSelectedRating(null)
        setFilters({
            minPrice: "",
            maxPrice: "",
            category: [],
            tags: []
        })
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-stone-900">Filters</h2>
                {activeFiltersCount > 0 && (
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                            {activeFiltersCount} active
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 w-8 p-0">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>
            <div className="space-y-4">
                <h3 className="font-medium text-stone-900">Price Range</h3>
                <div className="space-y-4">
                    <Slider value={priceRange} onValueChange={handleSliderChange} max={2000} step={50} className="w-full" />
                    <div className="flex items-center justify-between text-sm text-stone-600">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                </div>
            </div>
            <Separator />
            <div className="space-y-4">
                <h3 className="font-medium text-stone-900">Customer Rating</h3>
                <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <button
                            key={rating}
                            onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                            className={`flex items-center gap-2 w-full p-2 rounded-lg transition-colors ${selectedRating === rating ? "bg-amber-50 border border-amber-200" : "hover:bg-stone-50"
                                }`}
                        >
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-stone-300"}`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-stone-600">& up</span>
                        </button>
                    ))}
                </div>
            </div>
            <Separator />
            <div className="space-y-4">
                <h3 className="font-medium text-stone-900">Categories</h3>
                <div className="space-y-3">
                    {categories.map((category) => (
                        <div key={category.slug} className="flex items-center space-x-3">
                            <Checkbox
                                id={category.slug}
                                checked={selectedCategories.includes(category.slug)}
                                onCheckedChange={(checked) => handleCategoryChange(category.slug, checked as boolean)}
                            />
                            <label
                                htmlFor={category.slug}
                                className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                                {category.name}
                            </label>
                            <span className="text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded-full">{category.stats?.productCount}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}