import "@/app/globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { getAuthSession } from "@/lib/auth";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Study with ease by creating flashcards with the power of AI.",
    icons: {
        icon: "../BrainCards-Logo-RECOLOR.svg",
    },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    // const session = await getAuthSession();
    return (
        <html lang='en' className='scroll-smooth'>
            <body className={`${figtree.className} antialised`}>{children}</body>
        </html>
    );
}
