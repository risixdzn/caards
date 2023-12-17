"use client";
import Image from "next/image";
import Link from "next/link";
import TextLogo from "@/public/BrainCards-TextLogo-Light-RECOLOR.svg";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import Cards from "../public/Cards.svg";

function Navbar() {
    const paths = [
        { label: "Overview", href: "/" },
        { label: "Pricing", href: "/" },
        { label: "Contact", href: "/" },
    ];

    const [scrollPosition, setScrollPosition] = useState(0);
    const [scrollDirection, setScrollDirection] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.pageYOffset;

            if (currentPosition > scrollPosition) {
                setScrollDirection("down");
            } else if (currentPosition < scrollPosition) {
                setScrollDirection("up");
            }
            setScrollPosition(currentPosition);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrollPosition]);

    return (
        <>
            <header
                id='navbar'
                className={`w-full z-[99] fixed px-10  flex items-center justify-center transition-all duration-300 transition-
        ${scrollPosition >= 100 ? "bg-white h-20 " : " h-28"}`}
            >
                <div
                    className={`transition-all relative flex items-center justify-between w-full max-w-[110rem] duration-300
         ${scrollPosition >= 100 ? " max-w-full" : " max-w-[110rem] mt-4"}`}
                >
                    <div id='logo'>
                        <Image width={150} src={TextLogo} alt='Braincards Logo' />
                    </div>
                    <nav className='absolute left-1/2 -translate-x-[50%] lg:block hidden'>
                        <ul className='flex gap-16 '>
                            {paths.map((path, index) => (
                                <li className='text-base font-medium ' key={index}>
                                    <Link href={path.href}>{path.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div id='cta'>
                        <Button className='bg-[#F5A3D4] rounded-full h-8 lg:px-5 lg:text-base border-[1px] border-[#E192C2] hover:bg-[#E192C2]'>
                            Sign Up
                        </Button>
                        <Menu
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className='lg:hidden inline-block ml-4 z-[100]'
                        />
                    </div>
                </div>
            </header>
            <aside
                className={` ${
                    sidebarOpen ? "translate-x-0" : "translate-x-[100%] "
                } lg:hidden transition-all duration-300 fixed w-[100vw] h-full bg-white z-[99] p-10`}
            >
                <Image
                    src={Cards}
                    alt=''
                    width={100}
                    className='w-16 mt-4 inline-block -translate-y-2'
                />{" "}
                <Button
                    variant={"outline"}
                    size={"icon"}
                    className='absolute right-0 -translate-x-[100%]'
                >
                    <X
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className='lg:hidden inline-block z-[100] fixed'
                    />
                </Button>
                <nav className='mt-10'>
                    <ul className='flex flex-col gap-2 text-muted-foreground'>
                        {paths.map((path, index) => (
                            <li className='text-xl font-semibold ' key={index}>
                                <Link href={path.href}>{path.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div
                    id='bottom'
                    className='flex items-center justify-end w-[calc(100%-5rem)] -translate-y-[2.5rem] h-10 absolute bottom-0'
                >
                    <Button className=' bg-[#F5A3D4] rounded-full h-8 lg:px-5 lg:text-base border-[1px] border-[#E192C2] hover:bg-[#E192C2]'>
                        Sign Up
                    </Button>
                </div>
            </aside>
        </>
    );
}

export default Navbar;
