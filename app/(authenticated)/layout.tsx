import "@/app/globals.css";
import Navbar from "@/components/Dashboard/Navbar";
import { ReactQueryProvider } from "@/lib/ReactQueryProvider";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { ReactNode } from "react";

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
}: {
    children: ReactNode;
    modal: ReactNode;
}) {
    // const session = await getUserSession();
    return (
        <ReactQueryProvider>
            <html lang='en' className='scroll-smooth'>
                <body className={`${figtree.className} antialised select-none`}>
                    <Navbar />
                    <main className='pt-28 container'>
                        {modal}
                        {children}
                    </main>
                </body>
            </html>
        </ReactQueryProvider>
    );
}
