"use client";

import Image from "next/image";
import Cards from "@/public/Cards.svg";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChangeEvent, useState } from "react";
import { signIn } from "next-auth/react";
import google from "@/public/google.svg";
import twitter from "@/public/twitter.svg";
import github from "@/public/github.svg";
import { CheckCircle, Loader2, MailCheck, XCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function Login({ verify }: { verify?: boolean }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setEmail(event.target.value);
        return;
    };

    const handleEmailSignIn = () => {
        setLoading(true);
        signIn("email", { email });
    };

    const handleGoogleSignIn = () => {
        signIn("google");
    };

    const searchParams = useSearchParams();
    const error_code = searchParams.get("error")?.toLowerCase();

    const renderError = (error: string): { message: string; code: string } => {
        const error_messages: {
            [key: string]: { message: string; code: string };
        } = {
            oauthsignin: {
                message:
                    "An unexpected error occurred while authorizing your login. Please try again.",
                code: "OAuthCallback",
            },
            oauthcallback: {
                message: "An error occurred on the auth provider response. Please try again.",
                code: "OAuthCallback",
            },
            oauthcreateaccount: {
                message:
                    "We couldn't create the authentication provider in the database. Thats our fault.",
                code: "OAuthCreateAccount",
            },
            emailcreateaccount: {
                message: "We couldn't register your data in the database. Thats our fault.",
                code: "EmailCreateAccount",
            },
            callback: {
                message: "An error occurred on our auth API. Please try again.",
                code: "Callback",
            },
            oauthaccountnotlinked: {
                message:
                    "To confirm your identity, please sign in with the same account you used originally.",
                code: "OAuthAccount",
            },
            emailsignin: {
                message: "Oops... The email couldn't be delivered.",
                code: "EmailSignin",
            },
            credentialssignin: {
                message: "The authorize callback returned null in the Credentials provider.",
                code: "CredentialsSignin",
            },
            sessionrequired: {
                message: "The content of this page requires you to be signed in.",
                code: "SessionRequired",
            },
            default: {
                message: "Oops... You encountered an error. We're sorry for that.",
                code: "Default",
            },
        };

        return error_messages[error] || error_messages["default"];
    };

    const error = renderError(error_code as string);

    return (
        <div className='flex items-center flex-col w-[350px] space-y-6'>
            <div id='header' className='flex space-y-2 flex-col items-center'>
                {!verify ? (
                    <>
                        <Image src={Cards} width={60} alt='' className='w-10 my-2' />
                        <h1 className='text-2xl font-semibold tracking-tight'>Sign in</h1>
                        <p className='text-sm text-muted-foreground'>
                            Enter your email below to get started!
                        </p>
                    </>
                ) : (
                    <>
                        <MailCheck className='w-10 h-10 text-braincards' />
                        <h1 className='text-2xl font-semibold tracking-tight'>Sign in </h1>
                        <p className='text-sm text-muted-foreground'>
                            All right! You are almost in.
                        </p>
                    </>
                )}
            </div>

            {verify && (
                <>
                    {" "}
                    <p className='text-[0.92rem] text-center'>
                        Click the link sent to your <b className='hover:underline'>email</b> to{" "}
                        <b>seamlessly</b> sign in<br></br>
                        <span className='text-xs font-semibold'>Also check your spam folder!</span>
                    </p>
                    <p className='text-muted-foreground text-xs text-center max-w-[15rem]'>
                        Psst... just a heads up: Emails are might take a little while to arrive :D
                    </p>
                </>
            )}

            <form onSubmit={(e) => e.preventDefault()} className='w-full space-y-6'>
                <div id='actions' className='w-full space-y-2'>
                    {!verify && (
                        <Input
                            type='email'
                            placeholder='name@example.com'
                            className='h-9'
                            onChange={(event) => handleInputChange(event)}
                        ></Input>
                    )}
                    <Button
                        type='submit'
                        variant={"braincards"}
                        className='w-full h-9'
                        disabled={verify || loading}
                        onClick={() => handleEmailSignIn()}
                    >
                        {!loading ? (
                            !verify ? (
                                "Sign in with magic link"
                            ) : (
                                <CheckCircle />
                            )
                        ) : (
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        )}
                    </Button>
                </div>

                <div className='relative w-full'>
                    <div className='absolute inset-0 flex items-center'>
                        <span className='w-full border-t' />
                    </div>
                    <div className='relative flex justify-center text-xs uppercase'>
                        <span className='bg-background px-2 text-muted-foreground '>
                            Or continue with
                        </span>
                    </div>
                </div>

                <div id='providers' className='w-full flex items-center gap-2 flex-col'>
                    <div className='w-full'>
                        <Button
                            variant={"outline"}
                            disabled={verify}
                            className='w-full h-9 shadow-sm text-muted-foreground'
                            onClick={() => handleGoogleSignIn()}
                        >
                            <Image src={google} alt='' className='h-4 w-4 mr-2' />
                            Google
                        </Button>
                    </div>
                    <div className='flex w-full gap-2'>
                        <Button
                            variant={"outline"}
                            disabled={verify}
                            className='w-full h-9 shadow-sm text-muted-foreground'
                        >
                            <Image src={twitter} alt='' className='h-4 w-4 mr-2' />
                            Twitter
                        </Button>
                        <Button
                            variant={"outline"}
                            disabled={verify}
                            className='w-full h-9 shadow-sm text-muted-foreground'
                        >
                            <Image src={github} alt='' className='h-4 w-4 mr-2' />
                            Github
                        </Button>
                    </div>
                </div>
            </form>

            <p className='px-8 text-center text-sm text-muted-foreground'>
                {!error_code ? (
                    "New here? No worries! If you don't have an account, we'll create one for you!"
                ) : (
                    <TooltipProvider delayDuration={0}>
                        <Tooltip>
                            <TooltipTrigger>
                                <span className='text-destructive'>
                                    <XCircle className='h-4 w-4 mr-1 inline-block' />
                                    {error.message}
                                </span>
                            </TooltipTrigger>
                            <TooltipContent
                                className='border-destructive text-destructive'
                                side='bottom'
                            >
                                Error code: <b>{error.code}</b>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </p>
        </div>
    );
}
