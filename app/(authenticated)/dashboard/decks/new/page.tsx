"use client";

import { Description, Heading } from "@/components/Dashboard/Typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export const formSchema = z.object({
    title: z
        .string()
        .min(1, { message: "Title is required" })
        .max(30, { message: "Title should be shorter." }),
    description: z.string().max(150, { message: "Description should be shorter." }).optional(),
});

export default function NewDeck() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
        mode: "all",
    });

    const router = useRouter();

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
        try {
            axios.post("/api/decks", data).then((res) => {
                console.log(res.data);
            });
            toast({
                title: "Deck created",
                description: "Your deck has been created successfully.",
            });
            router.push(`/dashboard/decks?a=${Date.now()}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className='w-full flex gap-4'>
            <aside className='hidden w-[300px] flex-col md:flex space-y-4'>
                <Button variant={"ghost"}>
                    <ArrowLeft className='w-4 h-4 inline-block mr-2' />
                    Go back
                </Button>
            </aside>
            <div className='w-full'>
                <Heading>Create a deck</Heading>
                <Description>Fill the fields above to create your new deck.</Description>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='max-w-sm mt-2 space-y-3'
                    >
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title *</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Your title goes here' {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This will be the title of your deck.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder='This deck contains...' {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        You can insert a description to help identifying your deck.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type='submit'
                            disabled={!form.formState.isValid}
                            className='w-full mt-3'
                        >
                            Create deck <Plus className='w-5 h-5 inline-block ml-2' />
                        </Button>
                    </form>
                </Form>
            </div>
        </main>
    );
}
