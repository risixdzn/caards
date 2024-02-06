"use client";

import { usePathname } from "next/navigation";
import { ReactElement, cloneElement } from "react";
import Link from "next/link";
import { LayoutGrid, LibraryBig, User, WalletCards } from "lucide-react";

const bottomNavRoutes = [
    {
        href: "/dashboard/overview",
        label: "Overview",
        icon: <LayoutGrid />,
    },
    {
        href: "/dashboard/decks",
        label: "Decks",
        icon: <WalletCards />,
    },
    {
        href: "/dashboard/collections",
        label: "Collections",
        icon: <LibraryBig />,
    },
    {
        href: "/dashboard/settings/account",
        label: "Profile",
        icon: <User />,
    },
];

const NavLink = ({ href, icon, label }: { href: string; icon: ReactElement; label: string }) => {
    const currentRoute = usePathname().split("/")[2];
    const CustomIcon = ({ icon }: { icon: ReactElement }) => {
        return cloneElement(icon, {
            strokeWidth: currentRoute == href ? 2.5 : 2,
            className: "transition-all",
        });
    };

    return (
        <Link
            href={href}
            className={`transition-all flex flex-col items-center gap-1 ${
                currentRoute == href.split("/")[2] ? "text-foreground" : "text-muted-foreground"
            }`}
        >
            <CustomIcon icon={icon} />
            <p className='text-xs'>{label}</p>
        </Link>
    );
};

export function BottomNav() {
    return (
        <div className='lg:hidden w-full h-20 fixed z-[20] bottom-0 bg-background shadow-md rounded-t-3xl border-t-[1px] flex items-center justify-around px-5'>
            {bottomNavRoutes.map((route, index) => (
                <span id={route.label} key={index}>
                    <NavLink href={route.href} label={route.label} icon={route.icon} />
                </span>
            ))}
        </div>
    );
}
