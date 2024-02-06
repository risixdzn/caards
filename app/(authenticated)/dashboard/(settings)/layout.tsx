"use client";

import { CreditCard, User } from "lucide-react";
import { ReactNode } from "react";
import { AsideBtn } from "@/components/Dashboard/AsideBtn";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";

export default function SettingLayout({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <Toaster />
            <div className='w-full flex gap-10 sticky top-10'>
                <aside className='hidden w-[300px] flex-col md:flex space-y-4'>
                    <h4 className='font-semibold text-sm'>Navigation</h4>
                    <ul className='w-full space-y-2 '>
                        <li className='flex flex-col'>
                            <AsideBtn icon={<User />} href={"/settings/account"}>
                                Account
                            </AsideBtn>
                        </li>
                        <li>
                            <AsideBtn icon={<CreditCard />} href={"/settings/billing"}>
                                Billing
                            </AsideBtn>
                        </li>
                    </ul>
                </aside>
                <div>{children}</div>
            </div>
        </SessionProvider>
    );
}
