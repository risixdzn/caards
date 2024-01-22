import "@/app/globals.css";
import { ReactQueryProvider } from "@/lib/ReactQueryProvider";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { ReactNode } from "react";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Study with ease by creating flashcards with the power of AI.",
    icons: {
        icon: "../Caards-Logo-RECOLOR.svg",
    },
};

export default async function RootLayout({
    children,
    modal,
}: {
    children: ReactNode;
    modal: ReactNode;
}) {
    // const session = await getAuthSession();
    return (
        <ReactQueryProvider>
            <html lang='en' className='scroll-smooth'>
                <body className={`${figtree.className} antialised`}>
                    {modal}
                    {children}
                </body>
            </html>
        </ReactQueryProvider>
    );
}
