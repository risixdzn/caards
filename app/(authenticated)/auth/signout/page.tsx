"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "react-query";
import axios from "axios";
import { DoorOpen, Loader2 } from "lucide-react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signout() {
    const [loading, setLoading] = useState(false);

    const { data } = useQuery({
        queryKey: ["csrfToken"],
        queryFn: () => {
            return axios.get(`/api/auth/csrf`).then((res) => res.data);
        },
    });

    const csrfToken = data?.csrfToken;

    const router = useRouter();

    const cancel = () => {
        router.back();
    };

    return (
        <form action={"/api/auth/signout"} method='POST'>
            <input type='hidden' name='csrfToken' value={csrfToken}></input>
            <div className='flex items-center flex-col space-y-2'>
                <DoorOpen className='w-10 h-10' />
                <h1 className='text-2xl font-semibold tracking-tight'>Leaving your account</h1>
                <p className='text-lg text-muted-foreground tracking-tight max-w-sm text-center'>
                    By confirming, you will be logged out shortly.
                </p>
                <div className='flex gap-2 py-2'>
                    <Button type='button' variant={"ghost"} onClick={() => cancel()}>
                        Cancel
                    </Button>
                    <Button type='submit' variant={"caards"}>
                        {!loading ? (
                            <>
                                Sign out
                                <LogOut className='inline-block ml-1 h-4 w-4' />
                            </>
                        ) : (
                            <Loader2 className='h-4 w-4 animate-spin' />
                        )}
                    </Button>
                </div>
            </div>
        </form>
    );
}
