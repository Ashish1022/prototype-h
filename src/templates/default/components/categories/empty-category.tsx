"use client"
import { Layers, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EmptyCategoriesProps {
    title?: string
    description?: string
    showActionButton?: boolean
    actionButtonText?: string
    actionButtonLink?: string
    isAdmin?: boolean
}

export default function EmptyCategories({
    title = "No categories available",
    description = "We're working on adding new categories to our collection.",
    showActionButton = true,
    actionButtonText = "Browse Products",
    actionButtonLink = "/products",
    isAdmin = false,
}: EmptyCategoriesProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-stone-50 rounded-2xl border border-stone-200">
            <div className="relative w-40 h-40 mb-8">
                <div className="absolute inset-0 bg-amber-100 rounded-full opacity-50 animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Layers className="h-20 w-20 text-amber-500" strokeWidth={1.5} />
                </div>
            </div>

            <h3 className="text-2xl font-bold text-stone-900 mb-3">{title}</h3>
            <p className="text-stone-600 max-w-md mb-8">{description}</p>

            {showActionButton && (
                <Button
                    asChild={!isAdmin}
                    className={`${isAdmin ? "bg-amber-600" : "bg-stone-900"} hover:bg-amber-500 text-white rounded-full transition-all duration-300`}
                    onClick={isAdmin ? () => console.log("Admin action") : undefined}
                >
                    {isAdmin ? (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Category
                        </>
                    ) : (
                        <Link href={actionButtonLink}>{actionButtonText}</Link>
                    )}
                </Button>
            )}
        </div>
    )
}
