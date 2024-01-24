import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAuthSession } from "@/lib/auth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";

export default async function UserAccountNav() {
    const session = await getAuthSession();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className='flex gap-4'>
                        <div className='flex flex-col items-end'>
                            <h4 className='text-sm font-semibold'>{session?.user?.name}</h4>
                            <p className='text-sm text-muted-foreground whitespace-nowrap'>
                                Basic plan
                            </p>
                        </div>
                        <Avatar>
                            <AvatarImage src={session?.user?.image as string} />
                            <AvatarFallback className='font-semibold text-muted-foreground'>
                                {session?.user?.name?.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <div className='flex items-center justify-start gap-2 p-2'>
                        <div className='flex flex-col space-y-1 leading-none'>
                            {session?.user?.name && (
                                <p className='font-medium'>{session?.user?.name}</p>
                            )}
                            {session?.user?.email && (
                                <p className='w-[200px] truncate text-sm text-muted-foreground'>
                                    {session?.user?.email}
                                </p>
                            )}
                        </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href='/dashboard'>Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href='/dashboard/billing'>Billing</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href='/dashboard/settings'>Settings</Link>
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
