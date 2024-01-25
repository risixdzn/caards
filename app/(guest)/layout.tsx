import "@/app/globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { authOptions, getUserSession } from "@/lib/auth";
import { getServerSession } from "next-auth";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Caards",
    description: "Study with ease by creating flashcards with the power of AI.",
    icons: {
        icon: "../svg/Caards_Logo.svg",
    },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
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
