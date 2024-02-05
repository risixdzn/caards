import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserSession } from "@/lib/auth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notFound } from "next/navigation";

import Link from "next/link";

export default async function UserAccountNav() {
    const user = await getUserSession();

    if (!user) {
        return notFound();
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className='flex gap-4'>
                        <div className='flex flex-col items-end'>
                            <h4 className='text-sm font-semibold whitespace-nowrap'>{user.name}</h4>
                            <p className='text-sm text-muted-foreground whitespace-nowrap'>
                                Basic plan
                            </p>
                        </div>
                        <Avatar>
                            <AvatarImage src={user.image as string} />
                            <AvatarFallback className='font-semibold text-muted-foreground'>
                                {user.name?.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <div className='flex items-center justify-start gap-2 p-2'>
                        <div className='flex flex-col space-y-1 leading-none'>
                            {user.name && <p className='font-medium'>{user.name}</p>}
                            {user.email && (
                                <p className='w-[200px] truncate text-sm text-muted-foreground'>
                                    {user.email}
                                </p>
                            )}
                        </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href='/dashboard'>Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href='/dashboard/settings/billing'>Billing</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href='/dashboard/settings/account'>Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <Link href='/auth/signout'>
                        <DropdownMenuItem className='cursor-pointer'>Sign out</DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
