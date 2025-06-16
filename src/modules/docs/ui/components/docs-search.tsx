"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, FileText, Hash, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DocsSearchProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const searchResults = [
    {
        title: "Getting Started",
        description: "Learn how to integrate and use our platform effectively",
        href: "/docs",
        type: "page",
    },
    {
        title: "Authentication API",
        description: "Learn how to authenticate users and manage sessions",
        href: "/docs/api/authentication",
        type: "page",
    },
    {
        title: "Cloud Installation",
        description: "Get started quickly with our cloud-hosted solution",
        href: "/docs/installation/cloud",
        type: "page",
    },
    {
        title: "JWT Authentication",
        description: "Configure JWT-based authentication",
        href: "/docs/authentication/jwt",
        type: "section",
    },
    {
        title: "User Registration",
        description: "How to register new users via API",
        href: "/docs/api/authentication#register",
        type: "section",
    },
    {
        title: "Environment Variables",
        description: "Configure your app using environment variables",
        href: "/docs/configuration/app#environment-variables",
        type: "section",
    },
]

export function DocsSearch({ open, onOpenChange }: DocsSearchProps) {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState(searchResults)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const router = useRouter()

    useEffect(() => {
        if (!query.trim()) {
            setResults(searchResults)
            setSelectedIndex(0)
            return
        }

        const filtered = searchResults.filter(
            (result) =>
                result.title.toLowerCase().includes(query.toLowerCase()) ||
                result.description.toLowerCase().includes(query.toLowerCase()),
        )
        setResults(filtered)
        setSelectedIndex(0)
    }, [query])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!open) return

            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault()
                    setSelectedIndex((prev) => (prev + 1) % results.length)
                    break
                case "ArrowUp":
                    e.preventDefault()
                    setSelectedIndex((prev) => (prev - 1 + results.length) % results.length)
                    break
                case "Enter":
                    e.preventDefault()
                    if (results[selectedIndex]) {
                        router.push(results[selectedIndex].href)
                        onOpenChange(false)
                        setQuery("")
                    }
                    break
                case "Escape":
                    onOpenChange(false)
                    setQuery("")
                    break
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [open, results, selectedIndex, router, onOpenChange])

    const handleResultClick = (href: string) => {
        router.push(href)
        onOpenChange(false)
        setQuery("")
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="container mx-auto px-2 md:px-6 p-0 bg-zinc-900 border-zinc-800">
                <DialogHeader className="p-4 pb-0">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        <Input
                            placeholder="Search documentation..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="pl-10 bg-zinc-800 border-zinc-700 focus:border-blue-500 text-white placeholder:text-zinc-400"
                            autoFocus
                        />
                    </div>
                </DialogHeader>

                <div className="max-h-96 overflow-y-auto p-4 pt-2">
                    {results.length === 0 ? (
                        <div className="py-8 text-center text-zinc-400">
                            <Search className="mx-auto h-8 w-8 mb-2 opacity-50" />
                            <p>No results found for &quot;{query}&quot;</p>
                        </div>
                    ) : (
                        <ScrollArea className="space-y-1">
                            {results.map((result, index) => (
                                <button
                                    key={result.href}
                                    onClick={() => handleResultClick(result.href)}
                                    className={cn(
                                        "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                                        index === selectedIndex ? "bg-blue-500/10 border border-blue-500/20" : "hover:bg-zinc-800/50",
                                    )}
                                >
                                    <div className="flex-shrink-0">
                                        {result.type === "page" ? (
                                            <FileText className="h-4 w-4 text-blue-400" />
                                        ) : (
                                            <Hash className="h-4 w-4 text-purple-400" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-white truncate">{result.title}</div>
                                        <div className="text-sm text-zinc-400 truncate">{result.description}</div>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-zinc-500 flex-shrink-0" />
                                </button>
                            ))}
                        </ScrollArea>
                    )}
                </div>

                <div className="border-t border-zinc-800 p-3 text-xs text-zinc-500">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">↑↓</kbd>
                                Navigate
                            </span>
                            <span className="flex items-center gap-1">
                                <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">↵</kbd>
                                Select
                            </span>
                            <span className="flex items-center gap-1">
                                <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">esc</kbd>
                                Close
                            </span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
