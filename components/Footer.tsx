import Image from "next/image";
import Link from "next/link";
import TextLogo from "@/public/BrainCards-TextLogo-Light-RECOLOR.svg";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className='bg- rounded-lg m-4'>
            <div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
                <div className='sm:flex sm:items-center sm:justify-between'>
                    <Link
                        href='/'
                        className='flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse'
                    >
                        <Image src={TextLogo} className='h-12' alt='Braincards Logo' />
                    </Link>
                    <ul className='flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400'>
                        <li>
                            <a href='#' className='hover:underline me-4 md:me-6'>
                                About
                            </a>
                        </li>
                        <li>
                            <Link
                                href='/legal/privacy-policy'
                                className='hover:underline me-4 md:me-6'
                            >
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/legal/terms-and-conditions'
                                className='hover:underline me-4 md:me-6'
                            >
                                Terms and conditions
                            </Link>
                        </li>
                        <li>
                            <a href='#' className='hover:underline'>
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
                <hr className='my-6 border-border sm:mx-auto lg:my-8' />
                <span className='block text-sm text-muted-foreground sm:text-center '>
                    © {year}{" "}
                    <Link href='/' className='hover:underline'>
                        Braincards™
                    </Link>
                    . All Rights Reserved.
                </span>
            </div>
        </footer>
    );
}
