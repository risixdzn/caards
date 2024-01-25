"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, cloneElement, ReactElement } from "react";

export const AsideBtn = ({
    icon,
    children,
    href,
}: {
    icon: ReactElement;
    children: ReactNode;
    href: string;
}) => {
    const CustomIcon = ({ icon }: { icon: ReactElement }) => {
        return cloneElement(icon, {
            className: "w-5 h-5 mr-2",
        });
    };

    const pathname = usePathname();

    return (
        <Link href={`/dashboard${href}`} className='w-full'>
            <Button
                variant='ghost'
                className={`justify-start w-full ${
                    "/dashboard" + href === pathname && "bg-accent"
                }`}
            >
                <CustomIcon icon={icon} />
                {children}
            </Button>
        </Link>
    );
};
