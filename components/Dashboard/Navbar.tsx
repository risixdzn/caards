import TextLogo from "@/public/svg/Caards_TextLogo.svg";
import Logo from "@/public/svg/Caards_Logo.svg";
import Image from "next/image";
import UpgradeBtn from "./UpgradeBtn";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import UserAccountNav from "./UserAccountNav";
import { NavbarLink } from "./NavbarLink";

const navRoutes = [
    {
        href: "/dashboard/overview",
        label: "Overview",
    },
    {
        href: "/dashboard/decks",
        label: "Decks",
    },
    {
        href: "/dashboard/collections",
        label: "Collections",
    },
];

export default function Navbar() {
    return (
        <header className='fixed w-full h-20 z-[10] flex justify-center border-b-[1px] bg-background'>
            <div className='w-full px-6 flex justify-between items-center'>
                <div className='hidden lg:flex items-center gap-6'>
                    <div id='logo'>
                        <Image
                            width={100}
                            className='ml-3 lg:ml-0 hidden xl:block'
                            src={TextLogo}
                            alt='Caards Logo'
                        />
                        <Image
                            width={35}
                            className='ml-3 lg:ml-0 hidden lg:block xl:hidden'
                            src={Logo}
                            alt='Caards Logo'
                        />
                    </div>
                    <div>
                        <UpgradeBtn />
                    </div>
                    <nav className='px-10 '>
                        <ul className='flex gap-10'>
                            {navRoutes.map((route, index) => (
                                <li key={index}>
                                    <NavbarLink href={route.href}>{route.label}</NavbarLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className='flex gap-10'>
                    <Button
                        variant='outline'
                        className={
                            "hidden lg:flex h-9 w-full justify-between items-center bg-background rounded-[0.5rem]  text-sm text-muted-foreground shadow-none lg:gap-12 xl:gap-20"
                        }
                    >
                        <span className='hidden lg:inline-flex'>
                            <Search className='mr-2 w-5 h-5' />
                            Search...
                        </span>
                        <kbd className='pointer-events-none h-5 items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium opacity-100 sm:flex'>
                            <span className='text-xs'>⌘</span>K
                        </kbd>
                    </Button>
                    <UserAccountNav />
                </div>
                <div className='block lg:hidden'>
                    <Image
                        width={35}
                        className='lg:ml-0 block lg:hidden'
                        src={Logo}
                        alt='Caards Logo'
                    />
                </div>
            </div>
        </header>
    );
}
