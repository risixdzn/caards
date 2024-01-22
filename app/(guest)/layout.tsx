import "@/app/globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { getAuthSession } from "@/lib/auth";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Caards",
    description: "Study with ease by creating flashcards with the power of AI.",
    icons: {
        icon: "../Caards-Logo-RECOLOR.svg",
    },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getAuthSession();
    return (
        <html lang='en' className='scroll-smooth'>
            <body className={`${figtree.className} antialised`}>
                <Navbar session={session} />
                {children}
                <Footer />
            </body>
        </html>
    );
}
