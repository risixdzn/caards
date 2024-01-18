"use client";
import { useForm } from "react-hook-form";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import axios from "axios";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";

const formSchema = z.object({
    confirmInput: z
        .string()
        .min(1, { message: "Please fill the input above." })
        .regex(new RegExp("^Delete my account$"), {
            message: "Please type 'Delete my account' to confirm.",
        }),
    agree: z
        .boolean()
        .default(false)
        .refine((v) => v == true, { message: "Please mark the checkbox." }),
});

export default function DeleteAccount() {
    const form = useForm<z.infer<typeof formSchema>>({
        mode: "all",
        resolver: zodResolver(formSchema),
        defaultValues: {
            confirmInput: "",
            agree: false,
        },
    });

    const { formState } = form;
    const { isValid } = formState;

    const router = useRouter();

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setLoading(true);
        console.log(data);

        const res = await axios.post("/api/auth/delete-account");
        if (res.status === 200) {
            router.push("/auth/signin?deleted=true");
        }
    }

    const [loading, setLoading] = useState(false);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"destructive"}>Delete account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='max-w-sm'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are <b className='text-destructive'>deleting your account</b> and this
                        action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='confirmInput'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Type &quot;Delete my account&quot; to confirm.
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder='Delete my account' {...field} />
                                    </FormControl>
                                    <FormDescription>This action cannot be undone.</FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='agree'
                            render={({ field }) => (
                                <FormItem className='flex flex-row  space-x-3 space-y-0 rounded-md items-center'>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className='space-y-1 leading-none'>
                                        <FormLabel>
                                            I agree that all the my account data will be completely
                                            deleted and cannot be recovered.
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <AlertDialogFooter>
                            <AlertDialogCancel type='button'>Cancel</AlertDialogCancel>
                            <Button
                                disabled={!isValid || loading}
                                type='submit'
                                variant={"destructive"}
                            >
                                {!loading ? (
                                    "Delete my account"
                                ) : (
                                    <>
                                        <Loader2 className='w-4 h-4 animate-spin mr-2' />
                                        <span>Deleting account...</span>
                                    </>
                                )}
                            </Button>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
