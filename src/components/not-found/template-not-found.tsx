"use client"

import { motion } from "framer-motion"
import {
    Home,
    Search,
    Mail,
    ArrowLeft,
    RefreshCw,
    Clock,
    Shield,
    LayoutTemplate
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { BackgroundAnimations } from "@/components/background-animation"

export function TemplateNotFoundPage() {
    const handleRefresh = () => {
        window.location.reload()
    }

    const handleGoBack = () => {
        window.history.back()
    }

    const quickActions = [
        {
            icon: <Home className="h-5 w-5" />,
            title: "Return Home",
            description: "Go back to our homepage",
            href: "/",
            primary: true,
        },
        {
            icon: <Search className="h-5 w-5" />,
            title: "Explore Templates",
            description: "Browse other available templates",
            href: "/templates",
            primary: false,
        },
    ]

    const reasons = [
        {
            icon: <Clock className="h-5 w-5 text-amber-400" />,
            title: "Template Removed",
            description: "This template might have been unpublished or deleted",
        },
        {
            icon: <Shield className="h-5 w-5 text-blue-400" />,
            title: "Restricted Access",
            description: "You may not have access to view this template",
        },
        {
            icon: <Search className="h-5 w-5 text-green-400" />,
            title: "Incorrect URL",
            description: "The template link might be broken or outdated",
        },
    ]

    return (
        <div className="min-h-screen relative flex items-center justify-center py-12">
            <BackgroundAnimations />
            <div className="container relative z-10 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 mb-6">
                                <LayoutTemplate className="h-12 w-12 text-zinc-400" />
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">!</span>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Template Not Found</h1>
                            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
                                The template you&apos;re trying to access does not exist or is no longer available.
                            </p>
                        </motion.div>
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {quickActions.map((action) => (
                                <Button
                                    key={action.title}
                                    asChild
                                    size="lg"
                                    className={
                                        action.primary
                                            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8"
                                            : "border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white backdrop-blur-sm px-8"
                                    }
                                    variant={action.primary ? "default" : "outline"}
                                >
                                    <Link href={action.href}>
                                        {action.icon}
                                        <span className="ml-2">{action.title}</span>
                                    </Link>
                                </Button>
                            ))}
                        </motion.div>
                        <motion.div
                            className="flex flex-wrap gap-3 justify-center mb-16"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <Button
                                onClick={handleRefresh}
                                variant="ghost"
                                size="sm"
                                className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                            >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Refresh Page
                            </Button>
                            <Button
                                onClick={handleGoBack}
                                variant="outline"
                                size="sm"
                                className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Go Back
                            </Button>
                        </motion.div>
                        <motion.div
                            className="mb-16"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <div className="text-center mb-8">
                                <h3 className="text-xl font-semibold text-white mb-2">Why might this happen?</h3>
                                <p className="text-zinc-400">Some possible explanations are below.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {reasons.map((reason, index) => (
                                    <motion.div
                                        key={reason.title}
                                        className="bg-gradient-to-br from-zinc-900/60 to-zinc-900/30 border border-zinc-800/50 rounded-xl p-6 backdrop-blur-sm"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                                    >
                                        <div className="mb-4">{reason.icon}</div>
                                        <h4 className="font-semibold text-white mb-2">{reason.title}</h4>
                                        <p className="text-zinc-400 text-sm">{reason.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div
                            className="bg-gradient-to-br from-zinc-900/60 to-zinc-900/30 border border-zinc-800/50 rounded-2xl p-8 backdrop-blur-sm text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <h3 className="text-xl font-semibold text-white mb-4">Still need help?</h3>
                            <p className="text-zinc-400 mb-6 max-w-2xl mx-auto">
                                If you&apos;re looking for a specific template or believe this is a mistake, our support team is here to assist you.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    asChild
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                                >
                                    <Link href="/contact">
                                        <Mail className="mr-2 h-4 w-4" />
                                        Contact Support
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white backdrop-blur-sm"
                                >
                                    <Link href="/docs">
                                        <Search className="mr-2 h-4 w-4" />
                                        Help Center
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
