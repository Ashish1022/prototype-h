import React from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Clock, Globe, Rocket, Shield, Users, Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DocsToc } from '@/modules/docs/ui/components/docs-toc'
import { DocsHeader } from '@/modules/docs/ui/components/header'
import { Callout } from '@/modules/docs/ui/components/callout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from '@/modules/docs/ui/components/code-block'
import { DocsPager } from '@/modules/docs/ui/components/docs-pager'

const DocsPage = () => {
    return (
        <div className="container mx-auto px-2 md:px-6">
            <DocsHeader
                heading="Welcome to ZEROHUB"
                text="Everything you need to integrate, deploy, and scale your applications with our powerful platform."
                badge="v2.0"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
                <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Rocket className="h-5 w-5 text-blue-400" />
                            <CardTitle className="text-lg">Quick Start</CardTitle>
                        </div>
                        <CardDescription>Get up and running in under 5 minutes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="ghost" className="w-full justify-between group-hover:bg-blue-500/10">
                            Start Building
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-500/40 transition-all duration-300 group">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Zap className="h-5 w-5 text-green-400" />
                            <CardTitle className="text-lg">API Reference</CardTitle>
                        </div>
                        <CardDescription>Complete API documentation and examples</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="ghost" className="w-full justify-between group-hover:bg-green-500/10">
                            Explore APIs
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-purple-400" />
                            <CardTitle className="text-lg">Security</CardTitle>
                        </div>
                        <CardDescription>Learn about authentication and security</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="ghost" className="w-full justify-between group-hover:bg-purple-500/10">
                            Security Guide
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <DocsToc className="mb-8" />
            <div className="space-y-12">
                <section className='scroll-mt-20' id='introduction'>
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">What is SaaSApp?</h2>
                    <p className="text-zinc-300 leading-7">
                        SaaSApp is a comprehensive platform designed to accelerate your development workflow and scale your
                        applications effortlessly. Built with modern technologies and enterprise-grade security, it provides
                        everything you need to build, deploy, and manage sophisticated applications.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-400" />
                                Key Features
                            </h3>
                            <ul className="space-y-2 text-zinc-300">
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                    Enterprise-grade security and compliance
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                    Scalable infrastructure with auto-scaling
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                    Comprehensive API with SDKs
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                    Real-time analytics and monitoring
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Globe className="h-5 w-5 text-blue-400" />
                                Global Reach
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="bg-zinc-800/50 rounded-lg p-3">
                                    <div className="text-2xl font-bold text-blue-400">99.9%</div>
                                    <div className="text-zinc-400">Uptime SLA</div>
                                </div>
                                <div className="bg-zinc-800/50 rounded-lg p-3">
                                    <div className="text-2xl font-bold text-green-400">50+</div>
                                    <div className="text-zinc-400">Global Regions</div>
                                </div>
                                <div className="bg-zinc-800/50 rounded-lg p-3">
                                    <div className="text-2xl font-bold text-purple-400">1M+</div>
                                    <div className="text-zinc-400">API Calls/Day</div>
                                </div>
                                <div className="bg-zinc-800/50 rounded-lg p-3">
                                    <div className="text-2xl font-bold text-amber-400">24/7</div>
                                    <div className="text-zinc-400">Support</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Callout className="my-8">
                        <p>
                            <strong>New to SaaSApp?</strong> Start with our{" "}
                            <Link href="/docs/installation/cloud" className="text-blue-400 hover:text-blue-300 underline">
                                Cloud Installation guide
                            </Link>{" "}
                            for the fastest setup experience.
                        </p>
                    </Callout>
                </section>
                <section id="installation" className="scroll-mt-20">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Installation Options</h2>
                    <p className="text-zinc-300 leading-7">
                        Choose the installation method that best fits your needs. We offer multiple deployment options to
                        accommodate different use cases and infrastructure requirements.
                    </p>
                    <Tabs defaultValue="cloud" className="my-8">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="cloud" className="flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                Cloud
                            </TabsTrigger>
                            <TabsTrigger value="docker" className="flex items-center gap-2">
                                <Zap className="h-4 w-4" />
                                Docker
                            </TabsTrigger>
                            <TabsTrigger value="kubernetes" className="flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                Kubernetes
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="cloud" className="space-y-4">
                            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-blue-500/20">
                                <h3 className="text-lg font-semibold text-white mb-2">Cloud Hosted</h3>
                                <p className="text-zinc-300 mb-4">
                                    Get started instantly with our fully managed cloud solution. No infrastructure management required.
                                </p>
                                <CodeBlock variant="command">
                                    {`# Sign up and get your API key
curl -X POST https://api.zerohub.site/sign-up \\
  -H "Content-Type: application/json" \\
  -d '{"email": "you@company.com"}'`}
                                </CodeBlock>
                                <div className="flex items-center gap-2 mt-4">
                                    <Clock className="h-4 w-4 text-green-400" />
                                    <span className="text-sm text-green-400">Setup time: ~2 minutes</span>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="docker" className="space-y-4">
                            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-6 border border-green-500/20">
                                <h3 className="text-lg font-semibold text-white mb-2">Docker Container</h3>
                                <p className="text-zinc-300 mb-4">
                                    Run ZEROHUB in a Docker container for local development or custom deployments.
                                </p>
                                <CodeBlock variant="command">
                                    {`# Pull and run the latest image
docker run -d \\
  --name zerohub \\
  -p 3000:3000 \\
  -e DATABASE_URL=your_db_url \\
  zerohub/platform:latest`}
                                </CodeBlock>
                                <div className="flex items-center gap-2 mt-4">
                                    <Clock className="h-4 w-4 text-green-400" />
                                    <span className="text-sm text-green-400">Setup time: ~5 minutes</span>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="kubernetes" className="space-y-4">
                            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-6 border border-purple-500/20">
                                <h3 className="text-lg font-semibold text-white mb-2">Kubernetes Deployment</h3>
                                <p className="text-zinc-300 mb-4">
                                    Deploy ZEROHUB on Kubernetes for enterprise-scale applications with high availability.
                                </p>
                                <CodeBlock variant="command">
                                    {`# Deploy using Helm
helm repo add zerohub https://charts.zerohub.com
helm install zerohub zerohub/platform \\
  --set database.url=your_db_url`}
                                </CodeBlock>
                                <div className="flex items-center gap-2 mt-4">
                                    <Clock className="h-4 w-4 text-amber-400" />
                                    <span className="text-sm text-amber-400">Setup time: ~15 minutes</span>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </section>
                <section id="authentication" className="scroll-mt-20">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Authentication</h2>
                    <p className="text-zinc-300 leading-7">
                        ZEROHUB uses modern authentication standards including JWT tokens, OAuth 2.0, and multi-factor
                        authentication to ensure your applications and data remain secure.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
                        <div>
                            <h3 className="text-xl font-semibold tracking-tight mt-8 mb-3 scroll-m-20">Quick Authentication Example</h3>
                            <CodeBlock language="javascript">
                                {`// Initialize the SaaSApp client
import { ZEROHUB } from '@zerohub/sdk'

const client = new ZEROHUB({
  apiKey: process.env.ZEROHUB_API_KEY,
  environment: 'production'
})

// Authenticate a user
async function authenticateUser(email, password) {
  try {
    const { user, token } = await client.auth.login({
      email,
      password
    })
    
    // Store token securely
    localStorage.setItem('zerohub_token', token)
    
    return user
  } catch (error) {
    console.error('Authentication failed:', error)
    throw error
  }
}`}
                            </CodeBlock>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-lg font-medium text-white mb-3">Supported Auth Methods</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg">
                                        <Shield className="h-5 w-5 text-blue-400" />
                                        <div>
                                            <div className="font-medium text-white">JWT Tokens</div>
                                            <div className="text-sm text-zinc-400">Stateless authentication with configurable expiration</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg">
                                        <Globe className="h-5 w-5 text-green-400" />
                                        <div>
                                            <div className="font-medium text-white">OAuth 2.0</div>
                                            <div className="text-sm text-zinc-400">Google, GitHub, Microsoft, and custom providers</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg">
                                        <Users className="h-5 w-5 text-purple-400" />
                                        <div>
                                            <div className="font-medium text-white">Multi-Factor Auth</div>
                                            <div className="text-sm text-zinc-400">TOTP, SMS, and email-based 2FA</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Callout variant="info" className="my-8">
                        <p>
                            <strong>Security Best Practice:</strong> Always use HTTPS in production and store tokens securely.
                            Consider using HttpOnly cookies for web applications to prevent XSS attacks.
                        </p>
                    </Callout>
                </section>

                <section id="next-steps" className="scroll-mt-20">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Next Steps</h2>
                    <p className="text-zinc-300 leading-7">
                        Now that you understand the basics, explore these resources to dive deeper into ZEROHUB&apos;s capabilities.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                        <Card className="bg-zinc-800/20 border-zinc-700/50 hover:border-zinc-600 transition-colors">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-yellow-400" />
                                    API Documentation
                                </CardTitle>
                                <CardDescription>Comprehensive API reference with interactive examples</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full">
                                    Explore APIs
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-zinc-800/20 border-zinc-700/50 hover:border-zinc-600 transition-colors">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Rocket className="h-5 w-5 text-blue-400" />
                                    Tutorials
                                </CardTitle>
                                <CardDescription>Step-by-step guides for common use cases</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full">
                                    Start Learning
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>
            <DocsPager
                next={{
                    href: "/docs/introduction",
                    title: "Introduction",
                }}
            />
        </div>
    )
}

export default DocsPage