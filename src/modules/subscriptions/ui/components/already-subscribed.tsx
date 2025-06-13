"use client"

import Link from "next/link"
import { CheckCircle, ArrowRight, Calendar, CreditCard, Settings, Download, BarChart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BackgroundAnimations } from "@/components/background-animation"
import { ThemeProvider } from "@/providers/theme-provider"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Header } from "@/modules/auth/ui/components/header"

export const AlreadySubscribed = ({ subscriptionId }: { subscriptionId: string }) => {

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.subscriptions.getOne.queryOptions({ subscriptionId: subscriptionId }));

    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <Header />
            <div className="container py-12 px-4 md:px-6 mx-auto">
                <BackgroundAnimations />
                <div className="bg-emerald-900/20 border border-emerald-700/50 rounded-lg p-4 mb-8 flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <div>
                        <h3 className="font-medium text-emerald-400 mb-1">You're already subscribed!</h3>
                        <p className="text-emerald-200/80">
                            You currently have an active {data.plan.name} plan. You can manage your subscription or view your billing
                            history below.
                        </p>
                    </div>
                </div>
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold tracking-tight mb-3">Your Subscription</h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        View and manage your current subscription details, billing information, and usage statistics.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 shadow-lg mb-8">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-xl">Current Plan</CardTitle>
                                        <CardDescription>Your active subscription details</CardDescription>
                                    </div>
                                    <Badge variant="outline" className="bg-emerald-900/30 text-emerald-400 border-emerald-700/50 px-3 py-1">
                                        {data.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-6">
                                    <h3 className="text-3xl font-bold mb-1 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                                        {data.plan.name} Plan
                                    </h3>
                                    <p className="text-zinc-400">
                                        {data.plan.period === "monthly" ? "Monthly" : "Annual"} billing at {data.plan.period}
                                        /month
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 space-y-6">
                                    <div className="flex items-start gap-3">
                                        <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                                            <Calendar className="h-4 w-4 text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-zinc-300 mb-1">Next Billing Date</h4>
                                            <p className="text-zinc-400">{data.currentEnd?.slice(0, 10)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                                            <Calendar className="h-4 w-4 text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-zinc-300 mb-1">Started On</h4>
                                            <p className="text-zinc-400">{data.startAt?.slice(0, 10)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                                            <Settings className="h-4 w-4 text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-zinc-300 mb-1">Billing Cycle</h4>
                                            <p className="text-zinc-400 capitalize">{data.plan.period}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col sm:flex-row gap-4 pt-2">
                                <Button variant="outline" className="w-full sm:w-auto">
                                    Change Plan
                                </Button>
                                <Button variant="outline" className="w-full sm:w-auto">
                                    Update Payment Method
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full sm:w-auto text-red-400 hover:text-red-300 hover:border-red-800"
                                >
                                    Cancel Subscription
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card className="bg-zinc-900 border-zinc-700">
                            <CardHeader>
                                <CardTitle className="text-xl">Usage Statistics</CardTitle>
                                <CardDescription>Your current resource usage</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-zinc-400">Storage</span>
                                            <span className="text-sm text-zinc-400">23.4GB / 50GB</span>
                                        </div>
                                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                                                style={{ width: "47%" }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-zinc-400">API Calls</span>
                                            <span className="text-sm text-zinc-400">432K / 1M</span>
                                        </div>
                                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                                                style={{ width: "43%" }}
                                            ></div>
                                        </div>
                                    </div>

                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="space-y-6">
                        <Card className="bg-zinc-900 border-zinc-700">
                            <CardHeader>
                                <CardTitle className="text-lg">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button variant="outline" className="w-full justify-between">
                                    <span className="flex items-center">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download Invoices
                                    </span>
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" className="w-full justify-between">
                                    <span className="flex items-center">
                                        <BarChart className="mr-2 h-4 w-4" />
                                        View Usage Reports
                                    </span>
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" className="w-full justify-between">
                                    <span className="flex items-center">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Manage Team Access
                                    </span>
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-blue-900/20 to-violet-900/20 border-blue-800/30">
                            <CardHeader>
                                <CardTitle className="text-lg">Your Pro Benefits</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                                        <span className="text-zinc-300">Unlimited projects</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                                        <span className="text-zinc-300">Advanced analytics</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                                        <span className="text-zinc-300">Up to 10 team members</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                                        <span className="text-zinc-300">50GB storage</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                                        <span className="text-zinc-300">API access</span>
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700">
                                    Upgrade to Enterprise
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}