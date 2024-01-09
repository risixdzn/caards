import "@/app/globals.css";
import type { Metadata } from "next";
import { getAuthSession } from "@/lib/auth";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Study with ease by creating flashcards with the power of AI.",
    icons: {
        icon: "../BrainCards-Logo-RECOLOR.svg",
    },
};

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='p-5'>
            <div className='flex w-full min-h-[calc(100vh-(1.25rem*2))] rounded-lg border-border border-[1px] items-center justify-center'>
                <div className='hidden lg:flex lg:w-1/2 h-[calc(100vh-(1.25rem*2))] bg-neutral-100'></div>
                <div className='w-full lg:w-1/2 flex items-center justify-center px-4'>
                    {children}
                </div>
            </div>
        </div>
    );
}
