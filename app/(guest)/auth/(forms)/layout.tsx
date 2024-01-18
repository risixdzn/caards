import "@/app/globals.css";
import type { Metadata } from "next";
import GlowBg from "@/public/Glows.webp";
import Image from "next/image";
import Cards from "@/public/Cards.svg";
import { ActivityIcon, Blocks, Sparkle, Workflow, Zap } from "lucide-react";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";
import { Figtree } from "next/font/google";

const figtree = Figtree({ subsets: ["latin"] });

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
            <Toaster />
            <div className='flex w-full min-h-[calc(100vh-(1.25rem*2))] rounded-lg border-border border-[1px] items-center justify-center'>
                <div className='hidden lg:flex items-center justify-center lg:w-1/2 h-[calc(100vh-(1.25rem*2))] bg-neutral-100 relative'>
                    <div className='z-[3] space-y-6'>
                        <div className='p-3 bg-background shadow-md rounded-full w-[4.5rem] h-[4.5rem] grid place-items-center'>
                            <Image
                                src={Cards}
                                alt=''
                                width={100}
                                className='w-16 mt-4 inline-block -translate-y-2'
                            />{" "}
                        </div>
                        <h1 className='text-7xl font-semibold tracking-tight '>
                            Create flashcards<br></br>
                            with one click.
                        </h1>
                        <p id='desc' className='text-muted-foreground text-lg max-w-md'>
                            Join braincards and unleash your <b>full</b> studying potential with{" "}
                            <b>AI powered</b> flashcard creation.
                        </p>
                        <div
                            id='circles'
                            className='text-[0.8rem] text-muted-foreground flex  mt-6'
                        >
                            <div
                                id='circle'
                                className='w-14 h-14 border-[3px] border-background shadow-lg bg-braincards-light rounded-full z-[4]'
                            ></div>
                            <div
                                id='circle'
                                className='w-14 h-14 border-[3px] border-background shadow-lg bg-braincards rounded-full z-[3] -translate-x-1/2'
                            ></div>
                            <div
                                id='circle'
                                className='w-14 h-14 border-[3px] border-background shadow-lg bg-braincards-dark rounded-full z-[2] -translate-x-[100%]'
                            ></div>
                            <div
                                id='circle'
                                className='w-14 h-14 border-[3px] border-background shadow-lg bg-braincards-darker rounded-full z-[1] -translate-x-[150%]'
                            ></div>
                        </div>
                    </div>
                    <div
                        id='whiteglow'
                        className='absolute w-[30rem] h-[30rem] bg-background z-[2] blur-3xl opacity-50'
                    ></div>

                    <Image src={GlowBg} alt='' className='absolute w-full h-full z-[1]' />
                </div>
                <div className='w-full lg:w-1/2 flex items-center justify-center px-4 relative bg-center'>
                    {children}
                </div>
            </div>
        </div>
    );
}
