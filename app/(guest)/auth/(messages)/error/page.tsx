"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Error() {
    const searchParams = useSearchParams();
    const error_code = searchParams.get("error")?.toLowerCase();

    //"Looks like you got a bit lost. Please try again later or contact us if the problem persists."
    const renderError = (error: string): { title: string; description: string; code: string } => {
        const error_messages: {
            [key: string]: { title: string; description: string; code: string };
        } = {
            configuration: {
                title: "Server configuration error.",
                description: "We are sorry for that. Please try again later.",
                code: "AUTH_CONFIGURATION",
            },
            acccessDenied: {
                title: "Access denied.",
                description:
                    "It seems that you aren't supposed to be here... Please try again later.",
                code: "AUTH_ACCESSDENIED",
            },
            verification: {
                title: "Oops, this link has expired.",
                description:
                    "This email sign-in link has already expired. Please get a new one at our login page",
                code: "AUTH_VERIFICATION",
            },
            default: {
                title: "Well, this is awkward.",
                description: "Looks like you got an unexpected error. Please try again later.",
                code: "AUTH_DEFAULT",
            },
        };

        return error_messages[error] || error_messages["default"];
    };

    const error = renderError(error_code as string);

    return (
        <div className='p-5'>
            <div className='flex w-full min-h-[calc(100vh-(1.25rem*2))] rounded-lg border-border border-[1px] items-center justify-center'>
                <div className='flex items-center flex-col space-y-2'>
                    <XCircle className='text-destructive w-10 h-10 my-4' />
                    <h1 className='text-2xl font-semibold tracking-tight'>{error.title}</h1>
                    <p className='text-lg text-muted-foreground tracking-tight max-w-sm text-center'>
                        {error.description}
                    </p>
                    <Link href='/'>
                        <Button className='px-7 my-4'>Back to home</Button>
                    </Link>
                    <Badge variant={"outline"} className='text-muted-foreground text-[0.65rem]'>
                        {error.code}
                    </Badge>
                </div>
            </div>
        </div>
    );
}
