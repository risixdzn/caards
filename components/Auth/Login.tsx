"use client";

import Image from "next/image";
import Cards from "@/public/Cards.svg";
import google from "@/public/google.svg";
import twitter from "@/public/twitter.svg";
import github from "@/public/github.svg";
import { CheckCircle, Loader2, MailCheck, XCircle } from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

import { ChangeEvent, useEffect, useState } from "react";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useToast } from "../ui/use-toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function Login({ verify }: { verify?: boolean }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState<{ [key: string]: boolean }>({
        email: false,
        google: false,
        twitter: false,
        github: false,
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setEmail(event.target.value);
        return;
    };

    type SignInProps =
        | { provider: "email"; email: string }
        | { provider: "google" | "github" | "twitter" };

    const formSchema = z.object({
        email: z
            .string()
            .email({ message: "This is not an email" })
            .min(1, { message: "Fill your email to receive the magic link." })
            .refine((x) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(x), {
                message: "This is not an email",
            }),
    });

    const magiclinkform = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "all",
        defaultValues: {
            email: "",
        },
    });

    const { formState, watch } = magiclinkform;
    const { isValid } = formState;

    const handleSignIn = (props: SignInProps) => {
        setLoading((prevLoading) => ({
            ...prevLoading,
            [props.provider]: true,
        }));

        if (props.provider == "email") {
            try {
                signIn("email", { email: watch("email") });
            } finally {
                return;
            }
        }

        try {
            signIn(props.provider);
        } finally {
            return;
        }
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
                code: "OAuthSignIn",
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

    const deleted = searchParams.get("deleted")?.toLowerCase();
    const { toast } = useToast();

    useEffect(() => {
        if (deleted) {
            toast({
                title: "Account deleted.",
                description: "Your account was deleted successfully. We hope to see you soon!",
            });
        }
    }, [deleted, toast]);

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
                        <MailCheck className='w-10 h-10 text-caards' />
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

            <Form {...magiclinkform}>
                <form onSubmit={(e) => e.preventDefault()} className='w-full space-y-6'>
                    <div id='actions' className='w-full space-y-2'>
                        {!verify && (
                            <FormField
                                control={magiclinkform.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type='email'
                                                {...field}
                                                placeholder='name@example.com'
                                                className='h-9'
                                            ></Input>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        )}
                        <Button
                            type='submit'
                            className='w-full h-9'
                            disabled={verify || loading.email || !isValid}
                            onClick={() => handleSignIn({ provider: "email", email })}
                        >
                            {!loading.email ? (
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
                                disabled={verify || loading.google}
                                className='w-full h-9 shadow-sm text-muted-foreground'
                                onClick={() => handleSignIn({ provider: "google" })}
                            >
                                {!loading.google ? (
                                    <Image src={google} alt='' className='h-4 w-4 mr-2' />
                                ) : (
                                    <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                                )}
                                Google
                            </Button>
                        </div>
                        <div className='flex w-full gap-2'>
                            <Button
                                variant={"outline"}
                                disabled={verify || loading.twitter}
                                className='w-full h-9 shadow-sm text-muted-foreground'
                                onClick={() => handleSignIn({ provider: "twitter" })}
                            >
                                {!loading.twitter ? (
                                    <Image src={twitter} alt='' className='h-4 w-4 mr-2' />
                                ) : (
                                    <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                                )}
                                Twitter
                            </Button>
                            <Button
                                variant={"outline"}
                                disabled={verify || loading.github}
                                className='w-full h-9 shadow-sm text-muted-foreground'
                                onClick={() => handleSignIn({ provider: "github" })}
                            >
                                {!loading.github ? (
                                    <Image src={github} alt='' className='h-4 w-4 mr-2' />
                                ) : (
                                    <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                                )}
                                Github
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>

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
