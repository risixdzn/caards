"use client";

import { Description, Heading } from "@/components/Dashboard/Typography";
import { Button } from "@/components/ui/button";
import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Tumbleweed } from "@/public/svg/Tumbleweed";
import { Plus } from "lucide-react";
import { Deck } from "@prisma/client";
import Link from "next/link";
import { useQuery } from "react-query";
import axios from "axios";
import NewDeckDrawer from "@/components/Dashboard/Decks/NewDeckDrawer";
import { Skeleton } from "@/components/ui/skeleton";
import { DeckComponent } from "@/components/Dashboard/Decks/Deck";
import { motion } from "framer-motion";

export default function Decks() {
    const { data, isLoading } = useQuery({
        queryKey: "decks",
        queryFn: () => {
            return axios.get(`/api/decks`).then((res) => res.data);
        },
    });

    return (
        <main>
            <Heading>Decks</Heading>
            <Description>Here you can manage your flashcard decks.</Description>
            <NewDeckDrawer>
                <Button className='mt-2'>
                    New deck <Plus className='w-5 h-5 inline-block ml-2' />
                </Button>
            </NewDeckDrawer>
            <div className='grid place-items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6'>
                {!isLoading ? (
                    <>
                        {data?.length > 0 ? (
                            <>
                                {data.map((deck: Deck, index: number) => (
                                    <motion.div
                                        className='w-full'
                                        key={index}
                                        initial={
                                            index < 35
                                                ? { opacity: 0, scale: 0.8 }
                                                : { opacity: 1, scale: 1 }
                                        }
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.075 }}
                                    >
                                        <DeckComponent key={index} deck={deck} />
                                    </motion.div>
                                ))}
                            </>
                        ) : (
                            <>
                                <div className='col-span-3 row-span-3 w-full aspect-video mt-6 bg-accent rounded-lg border-dashed border-[2px] flex items-center justify-center flex-col space-y-4 p-6'>
                                    <Tumbleweed className='w-24 h-24 fill-neutral-500' />
                                    <h3 className='font-semibold text-muted-foreground text-2xl tracking-tight'>
                                        There is nothing here.
                                    </h3>
                                    <p className='max-w-sm text-sm text-muted-foreground text-center '>
                                        Get started by creating a new deck and adding some
                                        flashcards to it.
                                    </p>
                                    <NewDeckDrawer>
                                        <Button className='mt-2' variant={"outline"}>
                                            New deck <Plus className='w-5 h-5 inline-block ml-2' />
                                        </Button>
                                    </NewDeckDrawer>
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {Array.from({ length: 9 }).map((_, index) => (
                            <Skeleton key={index} className='w-full aspect-square' />
                        ))}
                    </>
                )}
            </div>
        </main>
    );
}
