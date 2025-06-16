import { BarChart3, BookOpen, ChevronDown, Clock, CreditCard, Database, FileText, FolderOpen, Globe, HardDrive, HelpCircle, Key, Layers, Mail, Map, Rocket, Settings, Shield, Users, Webhook, Zap } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type DocsSidebarNavProps = React.HTMLAttributes<HTMLDivElement>

export const DocsSidebar = ({ className, ...props }: DocsSidebarNavProps) => {
    return (
        <div className={cn("space-y-6", className)} {...props}>
            <div className="space-y-3">
                <div className="flex items-center gap-2 px-2">
                    <Rocket className="h-4 w-4 text-blue-400" />
                    <h4 className="text-sm font-semibold text-white">Getting Started</h4>
                </div>
                <div className="space-y-1">
                    <NavLink href="/docs" exact icon={<BookOpen className="h-4 w-4" />}>
                        Overview
                    </NavLink>
                    <NavLink href="/docs/introduction" icon={<FileText className="h-4 w-4" />}>
                        Introduction
                    </NavLink>
                </div>
            </div>

            <div className="space-y-3">
                <NavGroup icon={<Layers className="h-4 w-4 text-green-400" />} title="Installation" badge="Popular">
                    <NavLink href="/docs/installation/cloud" icon={<Globe className="h-4 w-4" />}>
                        Cloud Installation
                    </NavLink>
                    <NavLink href="/docs/installation/self-hosted" icon={<HardDrive className="h-4 w-4" />}>
                        Self-Hosted
                    </NavLink>
                    <NavLink href="/docs/installation/docker" icon={<Layers className="h-4 w-4" />}>
                        Docker
                    </NavLink>
                    <NavLink href="/docs/installation/kubernetes" icon={<Settings className="h-4 w-4" />}>
                        Kubernetes
                    </NavLink>
                </NavGroup>
            </div>

            <div className="space-y-3">
                <NavGroup icon={<Settings className="h-4 w-4 text-purple-400" />} title="Configuration">
                    <NavLink href="/docs/configuration/app" icon={<Settings className="h-4 w-4" />}>
                        App Configuration
                    </NavLink>
                    <NavLink href="/docs/configuration/database" icon={<Database className="h-4 w-4" />}>
                        Database
                    </NavLink>
                    <NavLink href="/docs/configuration/auth" icon={<Key className="h-4 w-4" />}>
                        Authentication
                    </NavLink>
                    <NavLink href="/docs/configuration/email" icon={<Mail className="h-4 w-4" />}>
                        Email
                    </NavLink>
                    <NavLink href="/docs/configuration/storage" icon={<HardDrive className="h-4 w-4" />}>
                        Storage
                    </NavLink>
                </NavGroup>
            </div>

            <div className="space-y-3">
                <NavGroup icon={<Shield className="h-4 w-4 text-amber-400" />} title="Authentication" badge="Secure">
                    <NavLink href="/docs/authentication/jwt" icon={<Key className="h-4 w-4" />}>
                        JWT Authentication
                    </NavLink>
                    <NavLink href="/docs/authentication/oauth" icon={<Globe className="h-4 w-4" />}>
                        OAuth Providers
                    </NavLink>
                    <NavLink href="/docs/authentication/roles" icon={<Users className="h-4 w-4" />}>
                        Roles & Permissions
                    </NavLink>
                    <NavLink href="/docs/authentication/mfa" icon={<Shield className="h-4 w-4" />}>
                        Multi-Factor Auth
                    </NavLink>
                </NavGroup>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-2 px-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    <h4 className="text-sm font-semibold text-white">API Reference</h4>
                </div>
                <NavGroup icon={<Zap className="h-4 w-4 text-blue-400" />} title="Core API" defaultOpen>
                    <NavLink href="/docs/api/authentication" icon={<Key className="h-4 w-4" />}>
                        Authentication
                    </NavLink>
                    <NavLink href="/docs/api/users" icon={<Users className="h-4 w-4" />}>
                        Users
                    </NavLink>
                    <NavLink href="/docs/api/projects" icon={<FolderOpen className="h-4 w-4" />}>
                        Projects
                    </NavLink>
                    <NavLink href="/docs/api/teams" icon={<Users className="h-4 w-4" />}>
                        Teams
                    </NavLink>
                </NavGroup>

                <NavGroup icon={<Zap className="h-4 w-4 text-purple-400" />} title="Advanced API">
                    <NavLink href="/docs/api/webhooks" icon={<Webhook className="h-4 w-4" />}>
                        Webhooks
                    </NavLink>
                    <NavLink href="/docs/api/integrations" icon={<Globe className="h-4 w-4" />}>
                        Integrations
                    </NavLink>
                    <NavLink href="/docs/api/analytics" icon={<BarChart3 className="h-4 w-4" />}>
                        Analytics
                    </NavLink>
                    <NavLink href="/docs/api/billing" icon={<CreditCard className="h-4 w-4" />}>
                        Billing
                    </NavLink>
                </NavGroup>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-2 px-2">
                    <HelpCircle className="h-4 w-4 text-cyan-400" />
                    <h4 className="text-sm font-semibold text-white">Resources</h4>
                </div>
                <div className="space-y-1">
                    <NavLink href="/docs/resources/faq" icon={<HelpCircle className="h-4 w-4" />}>
                        FAQ
                    </NavLink>
                    <NavLink href="/docs/resources/troubleshooting" icon={<Settings className="h-4 w-4" />}>
                        Troubleshooting
                    </NavLink>
                    <NavLink href="/docs/resources/changelog" icon={<Clock className="h-4 w-4" />}>
                        Changelog
                    </NavLink>
                    <NavLink href="/docs/resources/roadmap" icon={<Map className="h-4 w-4" />}>
                        Roadmap
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode
    href: string
    exact?: boolean
    icon?: React.ReactNode
}

function NavLink({ children, href, exact = false, icon, className, ...props }: NavLinkProps) {
    const pathname = usePathname()
    const isActive = exact ? pathname === href : pathname?.startsWith(href)

    return (
        <Link
            href={href}
            className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-zinc-800/50",
                isActive
                    ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-l-2 border-blue-500 text-white shadow-lg"
                    : "text-zinc-400 hover:text-white",
                className,
            )}
            {...props}
        >
            {icon && (
                <span
                    className={cn(
                        "transition-colors duration-200",
                        isActive ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-300",
                    )}
                >
                    {icon}
                </span>
            )}
            <span className="flex-1">{children}</span>
        </Link>
    )
}

interface NavGroupProps {
    title: string
    children: React.ReactNode
    icon?: React.ReactNode
    defaultOpen?: boolean
    badge?: string
}

function NavGroup({ title, children, icon, defaultOpen = false, badge }: NavGroupProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    const pathname = usePathname()

    const childLinks = React.Children.toArray(children) as React.ReactElement<NavLinkProps>[]
    const isActive = childLinks.some((child) => pathname?.startsWith(child.props.href))

    React.useEffect(() => {
        if (isActive) {
            setIsOpen(true)
        }
    }, [isActive])

    return (
        <div className="space-y-1">
            <button
                className={cn(
                    "group flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-zinc-800/50",
                    isActive || isOpen ? "text-white" : "text-zinc-400 hover:text-white",
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-3">
                    {icon && (
                        <span
                            className={cn(
                                "transition-colors duration-200",
                                isActive || isOpen ? "text-current" : "text-zinc-500 group-hover:text-zinc-300",
                            )}
                        >
                            {icon}
                        </span>
                    )}
                    <span>{title}</span>
                    {badge && (
                        <Badge variant="outline" className="text-xs border-zinc-700 text-zinc-400">
                            {badge}
                        </Badge>
                    )}
                </div>
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen ? "rotate-180" : "")} />
            </button>
            {isOpen && <div className="ml-6 space-y-1 border-l border-zinc-800 pl-4">{children}</div>}
        </div>
    )
}