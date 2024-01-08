"use client";

import { Wind } from "lucide-react";
import { ReactNode } from "react";
import { motion } from "framer-motion";

const WorkflowStep = ({
    number,
    title,
    description,
    children,
}: {
    number: number;
    title: string;
    description: string;
    children?: ReactNode;
}) => {
    return (
        <div className='flex items-center flex-col gap-2'>
            <div
                id='number'
                className='w-11 h-11 grid place-items-center font-bold text-xl rounded-full bg-muted'
            >
                {number}
            </div>
            <h3 className='text-xl font-semibold text-center'>{title}</h3>
            <h4 className='text-lg font-medium text-center text-muted-foreground '>
                {description}
            </h4>
            <div className='w-80 h-[17rem] rounded-lg bg-muted mt-4 flex'>{children}</div>
        </div>
    );
};

export default function Workflow() {
    return (
        <section
            id='overview'
            className='w-full h-auto py-28 flex flex-col items-center gap-2 lg:gap-6'
        >
            <h2 className='text-4xl  lg:text-6xl font-semibold flex items-center gap-4 lg:gap-8'>
                <Wind className='inline-block scale-[1.5] lg:scale-[3]' />
                Study with ease.
            </h2>
            <h3 className='text-xl lg:text-4xl text-muted-foreground font-semibold text-center'>
                Generate flashcards with one single click.
            </h3>
            <div className='flex gap-16 mt-10 flex-wrap justify-center'>
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                >
                    <WorkflowStep
                        number={1}
                        title={"Imagine a theme"}
                        description={"It can be literally anything."}
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                >
                    <WorkflowStep
                        number={2}
                        title={"Ask braincards"}
                        description={"Let the app do the *magic*"}
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                >
                    <WorkflowStep
                        number={3}
                        title={"Done!"}
                        description={"All your flashcards are ready."}
                    />
                </motion.div>
            </div>
        </section>
    );
}
