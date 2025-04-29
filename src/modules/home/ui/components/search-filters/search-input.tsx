"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { ListFilterIcon, SearchIcon } from "lucide-react"
import { useState } from "react";
import { CategoriesSidebar } from "../categories/categories-sidebar";

export const SearchInput = ({ disabled }: { disabled?: boolean }) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex items-center gap-2 w-full">
            <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
            <div className="relative w-full">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1.5 size-4 text-neutral-500" />
                <Input className="pl-8" placeholder="Search Product..." disabled={disabled} />
            </div>
            <Button
                variant="elevated"
                className="size-12 shrink-0 flex lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
            >
                <ListFilterIcon />
            </Button>
        </div>
    )
}