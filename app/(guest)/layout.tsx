import "../globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Braincards",
    description: "Study with ease by creating flashcards with the power of AI.",
    icons: {
        icon: "../BrainCards-Logo-RECOLOR.svg",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={`${figtree.className} antialised`}>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
