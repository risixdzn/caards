"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export const NavbarLink = ({ children, href }: { children: ReactNode; href: string }) => {
    const pathname = usePathname();
    return (
        <Link
            href={href}
            className={`text-[0.925rem] ${
                href.split("/")[2] === pathname.split("/")[2]
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground font-normal"
            }`}
        >
            {children}
        </Link>
    );
};
