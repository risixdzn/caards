"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";

export default function EditDisplayName({
    display_name,
}: {
    display_name: string | null | undefined;
}) {
    const [loading, setLoading] = useState(false);
    const { update } = useSession();

    const formSchema = z.object({
        display_name: z
            .string()
            .min(2, { message: "Please fill your display name" })
            .max(32, { message: "Too big! Please consider a short one." }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            display_name: display_name as string,
        },
        mode: "all",
    });

    const { formState } = form;
    const { isValid } = formState;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
            update({ name: data.display_name });
            toast({
                title: "Everything updated!",
                description: "Changes will take action when you reload the page.",
                action: (
                    <ToastAction altText='reload' onClick={() => window.location.reload()}>
                        Reload
                    </ToastAction>
                ),
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name='display_name'
                    render={({ field }) => (
                        <FormItem>
                            <div className='flex gap-2 lg:flex-row flex-col'>
                                <Input {...field} className='w-full lg:w-72' />
                                <Button disabled={loading || !isValid} className='w-full lg:w-auto'>
                                    {!loading ? (
                                        <Save className='h-4 w-4 mr-2' />
                                    ) : (
                                        <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                                    )}
                                    Save
                                </Button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
