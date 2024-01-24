import TextLogo from "@/public/svg/Caards_TextLogo.svg";
import Image from "next/image";
import UpgradeBtn from "./UpgradeBtn";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import UserAccountNav from "./UserAccountNav";

export default function Navbar() {
    return (
        <header className='fixed w-full h-20 z-[10] flex justify-center border-b-[1px]'>
            <div className='w-full px-6 flex justify-between items-center'>
                <div className='flex items-center gap-6'>
                    <div id='logo'>
                        <Image
                            width={100}
                            className='ml-3 lg:ml-0'
                            src={TextLogo}
                            alt='Caards Logo'
                        />
                    </div>
                    <div>
                        <UpgradeBtn />
                    </div>
                    <nav className='px-10 text-[0.925rem] font-semibold'>
                        <ul className='flex gap-10'>
                            <li>Overview</li>
                            <li>Decks</li>
                            <li>Collections</li>
                        </ul>
                    </nav>
                </div>
                <div className='flex gap-10'>
                    <Button
                        variant='outline'
                        className={
                            "h-9 w-full justify-between items-center bg-background rounded-[0.5rem]  text-sm text-muted-foreground shadow-none gap-20"
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
            </div>
        </header>
    );
}
