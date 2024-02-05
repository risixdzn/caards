"use client";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useRouter } from "next/router";
import { useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
import { Description, Heading } from "@/components/Dashboard/Typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "react-query";

export const newDeckFormSchema = z.object({
    title: z
        .string()
        .min(1, { message: "Title is required" })
        .max(30, { message: "Title should be shorter." }),
    description: z.string().max(150, { message: "Description should be shorter." }).optional(),
});

const NewDeck = ({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof newDeckFormSchema>>({
        resolver: zodResolver(newDeckFormSchema),
        defaultValues: {
            title: "",
            description: "",
        },
        mode: "all",
    });

    const queryClient = useQueryClient();

    const onSubmit = async (data: z.infer<typeof newDeckFormSchema>) => {
        setLoading(true);

        try {
            console.log(data);
            await axios
                .post("/api/decks", { title: data.title, description: data.description })
                .then((res) => {
                    if (res.status === 201) {
                        setOpen(false);
                        toast({
                            title: "Deck created!",
                            description: "Your new deck was created successfully.",
                        });
                    }
                });
            //Just for later code reutilizing purposes:
            // TAGS: REFETCH DATA QUERY REACT QUERY
            queryClient.invalidateQueries("decks");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className='flex items-center lg:items-start flex-col my-10 lg:my-0 px-6 lg:px-0'>
            <Heading className='text-center lg:text-left text-2xl'>Create a deck</Heading>
            <Description className='text-center lg:text-left lg:text-md'>
                Fill the fields above to create your new deck.
            </Description>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='max-w-sm mt-2 space-y-3'>
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
                        disabled={!form.formState.isValid || loading}
                        className='w-full mt-3'
                    >
                        {!loading ? (
                            <>
                                Create deck <Plus className='w-5 h-5 inline-block ml-2' />
                            </>
                        ) : (
                            <>
                                Creating{" "}
                                <Loader2 className='animate-spin w-4 h-4 inline-block ml-2' />
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </main>
    );
};

export default function NewDeckDrawer({ children }: { children: ReactNode }) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [open, setOpen] = useState(false);

    if (isDesktop) {
        return (
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>{children}</SheetTrigger>
                <SheetContent>
                    <NewDeck setOpen={setOpen} />
                </SheetContent>
            </Sheet>
        );
    }
    return (
        <Drawer shouldScaleBackground={true} open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent>
                <NewDeck setOpen={setOpen} />
            </DrawerContent>
        </Drawer>
    );
}
