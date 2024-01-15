import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div
                id='gradient'
                className='absolute bg-gradient-to-r from-braincards-light/40 to-braincards/40 w-full h-[30rem] z-0'
            >
                <div
                    id='blackoverlay'
                    className='w-full h-full bg-gradient-to-b from-transparent to-background'
                ></div>
            </div>
            <main className='max-w-7xl mx-auto z-10 relative px-6 pt-36'>
                <Link href={"/"} className='text-muted-foreground text-sm'>
                    <ArrowLeft className='scale-75 inline-block' /> Back to home
                </Link>
                <div className='flex gap-4 items-center mt-16 flex-wrap'>
                    <a
                        id='badge'
                        className='px-6 py-2 text-xs bg-gradient-to-br rounded-full  from-braincards-light/90 to-braincards/90 text-white'
                    >
                        Legal terms
                    </a>
                    <p className='text-muted-foreground text-sm'>Last updated: 13/01/2024</p>
                </div>
                <article className='mt-4 max-w-3xl'>{children}</article>
            </main>
        </>
    );
}
