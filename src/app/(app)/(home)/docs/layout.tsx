"use client"

import React, { useState } from 'react'
import { BookOpen, Github, Menu, MessageCircle, Search, X } from 'lucide-react'

import { DocsBreadcrumb } from '@/modules/docs/ui/components/docs-breadcrumb'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DocsSearch } from '@/modules/docs/ui/components/docs-search'
import { DocsSidebar } from '@/modules/docs/ui/components/docs-sidebar'

const DocsLayout = ({ children }: { children: React.ReactNode }) => {

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)

    return (
        <div className="relative flex min-h-screen flex-col">
            <div className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-zinc-800/50 bg-zinc-950/95 px-4 backdrop-blur-xl md:px-6 lg:px-8">
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden hover:bg-zinc-800/50"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                >
                    {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>

                <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-400" />
                    <h1 className="text-lg font-semibold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                        Documentation
                    </h1>
                    <Badge variant="outline" className="hidden sm:inline-flex border-blue-500/20 text-blue-400">
                        v2.0
                    </Badge>
                </div>

                <div className="flex-1" />

                <Button
                    variant="outline"
                    className="hidden md:flex items-center gap-2 w-64 justify-start text-zinc-400 border-zinc-700/50 hover:border-zinc-600 hover:bg-zinc-800/50"
                    onClick={() => setSearchOpen(true)}
                >
                    <Search className="h-4 w-4" />
                    <span className="text-sm">Search docs...</span>
                    <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-700 bg-zinc-800 px-1.5 font-mono text-xs text-zinc-400">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden hover:bg-zinc-800/50"
                    onClick={() => setSearchOpen(true)}
                >
                    <Search className="h-5 w-5" />
                </Button>

                <div className="hidden lg:flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-800/50">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                    </Button>
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-800/50">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Support
                    </Button>
                </div>
            </div>
            <div className="container flex-1 items-start md:grid md:grid-cols-[280px_minmax(0,1fr)] lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)]">
                <aside
                    className={`fixed inset-0 top-16 z-30 h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r border-zinc-800/50 bg-zinc-950/95 backdrop-blur-xl md:sticky md:block ${sidebarOpen ? "block" : "hidden"
                        }`}
                >
                    <div className="p-6">
                        <DocsSidebar className='mt-16 md:mt-0' />
                    </div>
                </aside>
                <main className="relative mx-auto">
                    <div className="mx-auto container px-2 py-8 md:px-6 lg:px-8">
                        <DocsBreadcrumb />
                        <div className="mt-6">{children}</div>
                    </div>
                </main>
            </div>
            <DocsSearch open={searchOpen} onOpenChange={setSearchOpen} />
        </div>
    )
}

export default DocsLayout