import "@/app/globals.css";
import { BottomNav } from "@/components/Dashboard/BottomNav";
import Navbar from "@/components/Dashboard/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryProvider } from "@/lib/ReactQueryProvider";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "react-query";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Study with ease by creating flashcards with the power of AI.",
    icons: {
        icon: "../svg/Caards_Logo.svg",
    },
};

export default async function RootLayout({
    children,
    modal,
    drawer,
}: {
    children: ReactNode;
    modal: ReactNode;
    drawer: ReactNode;
}) {
    // const session = await getUserSession();
    return (
        <ReactQueryProvider>
            <html lang='en' className='scroll-smooth'>
                <body
                    className={`${figtree.className} antialised select-none min-h-screen bg-background hiddenscrollbar`}
                >
                    <div vaul-drawer-wrapper=''>
                        <div className='relative flex min-h-screen flex-col bg-background'>
                            <Navbar />
                            <Toaster />
                            <BottomNav />
                            <main className='pt-28 container pb-28'>
                                {modal}
                                {drawer}
                                {children}
                            </main>
                        </div>
                    </div>
                </body>
            </html>
        </ReactQueryProvider>
    );
}
