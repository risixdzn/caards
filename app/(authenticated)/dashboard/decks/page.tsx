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
import { Deck as DeckComponent } from "@/components/Dashboard/Decks/Deck";
import CardsIcon from "@/public/svg/CardsIcon";
import { Badge } from "@/components/ui/badge";
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
            <div className='grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6'>
                {!isLoading ? (
                    <>
                        {data?.length > 0 ? (
                            <>
                                {data.map((deck: Deck, index: number) => (
                                    <motion.div
                                        key={index}
                                        initial={
                                            index < 35
                                                ? { opacity: 0, scale: 0.8 }
                                                : { opacity: 1, scale: 1 }
                                        }
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.075 }}
                                    >
                                        <DeckComponent key={index}>
                                            <div className='w-full flex justify-between'>
                                                <h3 className='text-xl font-semibold tracking-tight w-full whitespace-nowrap truncate'>
                                                    <CardsIcon className='fill-foreground inline-block scale-75 -translate-y-1 mr-2' />
                                                    {deck.title}
                                                </h3>
                                                <div className='w-12 h-6 bg-accent rounded-full border-4 border-white shadow-md'></div>
                                            </div>
                                            <p className='whitespace-nowrap truncate text-sm text-muted-foreground'>
                                                Lorem ipsum, dolor sit amet consectetur adipisicing
                                                elit. Exercitationem error assumenda enim voluptate
                                                quis, quaerat nobis. Fugiat eum, excepturi porro
                                                laborum quasi rem esse harum neque non soluta
                                                aliquam architecto.
                                            </p>
                                            <Badge className=''>15 cards</Badge>
                                        </DeckComponent>
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
