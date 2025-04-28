import { Footer } from "@/modules/home/ui/components/footer";
import { Navbar } from "@/modules/home/ui/components/navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='flex flex-col min-h-screen'>
             <Navbar />
             <main className='flex-1 bg-[#f4f4f0]'>
                {children}
            </main>
            <Footer />
        </div>

    );
};