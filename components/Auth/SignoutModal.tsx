"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "../ui/dialog";
import { useState, useEffect } from "react";
import { DoorOpen, Loader2, LogOut, X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "react-query";

export default function SignoutModal() {
    const searchParams = useSearchParams();
    const signout = searchParams.get("signout");

    // This terrible hack is needed to prevent hydration errors.
    // The Radix Dialog is not rendered correctly server side, so we need to prevent it from rendering until the client side hydration is complete (and `useEffect` is run).
    // The issue is reported here: https://github.com/radix-ui/primitives/issues/1386

    const [open, setOpen] = useState<boolean>(false); //this needs to be false, so the component is not rendered on the server

    useEffect(() => {
        // setOpen(Boolean(signout));
        setOpen(true);
    }, [setOpen]);

    const router = useRouter();

    const openChangeModal = (x: boolean) => {
        setOpen(x);
        if (x === false) {
            setTimeout(() => {
                router.back();
            }, 200);
        }
        return;
    };

    const { data } = useQuery({
        queryKey: ["csrfToken"],
        queryFn: () => {
            return axios.get(`/api/auth/csrf`).then((res) => res.data);
        },
    });

    const csrfToken = data?.csrfToken;

    const [loading, setLoading] = useState(false);

    return (
        <Dialog open={open} onOpenChange={openChangeModal}>
            <DialogContent className='max-w-sm pb-8' closevisible={false}>
                <div className='flex w-full -mb-6 justify-end'>
                    <DialogClose onClick={() => openChangeModal(false)}>
                        <Button className='w-5 h-5 p-0' variant={"ghost"}>
                            <X className='text-muted-foreground w-4 h-4 right-0 mr-' />
                        </Button>
                    </DialogClose>
                </div>

                <form action={"/api/auth/signout"} method='POST'>
                    <input type='hidden' name='csrfToken' value={csrfToken}></input>
                    <DialogHeader>
                        <DialogTitle>
                            Leaving your account
                            <DoorOpen className='inline-block ml-1 h-6 w-6' />
                        </DialogTitle>
                        <DialogDescription>You&apos;ll be logged out shortly.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className='sm:mt-4'>
                        <Button
                            onClick={() => openChangeModal(false)}
                            variant={"ghost"}
                            type='button'
                            className='mt-2'
                        >
                            Cancel
                        </Button>
                        <Button type='submit' onClick={() => setLoading(true)} className='mt-2'>
                            {!loading ? (
                                <>
                                    Sign out
                                    <LogOut className='inline-block ml-1 h-4 w-4' />
                                </>
                            ) : (
                                <Loader2 className='h-4 w-4 animate-spin' />
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
