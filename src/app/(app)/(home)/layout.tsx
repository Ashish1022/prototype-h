import React from 'react'

import { ThemeProvider } from '@/providers/theme-provider'
import { Navbar } from '@/modules/home/ui/components/navbar'
import { Footer } from '@/modules/home/ui/components/footer'
import { BackgroundAnimations } from '@/components/background-animation'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <div className='flex flex-col min-h-screen'>
                <BackgroundAnimations />
                <Navbar />
                <main className='flex-1'>
                    {children}
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    )
}

export default HomeLayout