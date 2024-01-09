"use client";

import Image from "next/image";
import Cards from "@/public/Cards.svg";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChangeEvent, useEffect, useState, useRef } from "react";
import { signIn } from "next-auth/react";
import google from "@/public/google.svg";
import twitter from "@/public/twitter.svg";
import github from "@/public/github.svg";
import { CheckCircle, ExternalLink, Loader2, MailCheck } from "lucide-react";
import Link from "next/link";

export function Login({ verify }: { verify?: boolean }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setEmail(event.target.value);
        localStorage.setItem("loginform_email", event.target.value);
        return;
    };

    const handleEmailSignIn = () => {
        setLoading(true);
        signIn("email", { email });
    };

    //needed to use the ref and change it on useeffect to prevent localstorage to being invoked on server
    const loginform_email = useRef<string | null>(null);

    useEffect(() => {
        loginform_email.current = localStorage.getItem("loginform_email");
    }, []);

    const email_domain = loginform_email.current
        ? loginform_email.current?.split("@")[1]
        : "test.com";
    const domain_href = `https://${email_domain}`;

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
                        Click the link sent to your{" "}
                        <b className='hover:underline'>
                            <Link href={domain_href} target='_blank'>
                                {email_domain}
                                <ExternalLink className='h-4 w-4 inline-block text-foreground ml-1' />
                            </Link>
                        </b>{" "}
                        email to <b>seamlessly</b> sign in<br></br>
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
                        type='button'
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

                <div id='providers' className='w-full  flex items-center gap-2'>
                    <Button variant={"outline"} disabled={verify} className='w-full h-9 shadow-sm'>
                        <Image src={google} alt='' className='h-4 w-4' />
                    </Button>
                    <Button variant={"outline"} disabled={verify} className='w-full h-9 shadow-sm'>
                        <Image src={twitter} alt='' className='h-4 w-4' />
                    </Button>
                    <Button variant={"outline"} disabled={verify} className='w-full h-9 shadow-sm'>
                        <Image src={github} alt='' className='h-4 w-4' />
                    </Button>
                </div>
            </form>

            <p className='px-8 text-center text-sm text-muted-foreground'>
                New here? No worries! If you don&apos;t have an account, we&apos;ll create one for
                you!
            </p>
        </div>
    );
}
