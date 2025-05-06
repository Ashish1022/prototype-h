"use client"

import { Button } from "@/components/ui/button";
import { useProductFilters } from "../../hooks/use-product-filter"
import { cn } from "@/lib/utils";

export const ProductsSort = () => {

    const [filters, setFilters] = useProductFilters();

    return (
        <div className="flex items-center gap-2">
            <Button className={cn("rounded-full bg-white hover:bg-white", filters.sort !== "curated" && "border-transparent bg-transparent hover:border-border hover:bg-transparent")} size="sm" variant="secondary" onClick={() => setFilters({ sort: "curated" })}>
                Curated
            </Button>
            <Button className={cn("rounded-full bg-white hover:bg-white", filters.sort !== "trending" && "border-transparent bg-transparent hover:border-border hover:bg-transparent")} size="sm" variant="secondary" onClick={() => setFilters({ sort: "trending" })}>
                Trending
            </Button>
            <Button className={cn("rounded-full bg-white hover:bg-white", filters.sort !== "hot_and_new" && "border-transparent bg-transparent hover:border-border hover:bg-transparent")} size="sm" variant="secondary" onClick={() => setFilters({ sort: "hot_and_new" })}>
                Hot & New
            </Button>
        </div>
    )
}