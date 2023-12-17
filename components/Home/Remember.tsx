"use client";
import { useState } from "react";
import Flashcard from "../Flashcard";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";

const DifficultySelector = ({
    difficulty,
    setDifficulty,
    className,
}: {
    difficulty: 0 | 1 | 2;
    setDifficulty: Dispatch<SetStateAction<0 | 1 | 2>>;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "relative bg-white shadow-md p-[0.4rem] rounded-full flex gap-4",
                className
            )}
        >
            <div className='z-[2] flex gap-4'>
                <Button
                    onClick={() => setDifficulty(0)}
                    className={`rounded-full w-28 px-8 bg-transparent hover:bg-transparent  ${
                        difficulty == 0 ? "text-white" : "text-muted-foreground"
                    }`}
                >
                    Easy - 1h
                </Button>
                <Button
                    onClick={() => setDifficulty(1)}
                    className={`rounded-full w-28 px-8 bg-transparent  hover:bg-transparent ${
                        difficulty == 1 ? "text-white" : "text-muted-foreground"
                    }`}
                >
                    Medium - 15m
                </Button>
                <Button
                    onClick={() => setDifficulty(2)}
                    className={`rounded-full w-28 px-8 bg-transparent hover:bg-transparent  ${
                        difficulty == 2 ? "text-white" : "text-muted-foreground"
                    }`}
                >
                    Hard - 2m
                </Button>
            </div>
            <div
                className={`transition-all absolute bg-[#22C55E] w-28 h-10 rounded-full ${
                    difficulty == 1 && "translate-x-[calc(100%+1rem)] bg-[#ECB424]"
                } ${difficulty == 2 && "translate-x-[calc(200%+2rem)] bg-[#E24C4C]"}`}
            ></div>
        </div>
    );
};

export default function Remember() {
    const [difficulty, setDifficulty] = useState<0 | 1 | 2>(0);

    type DifficultyProps = {
        difficulty: string;
        title: string;
        time: string;
        color: string;
        flashcard?: { front: string; back: string };
    };

    const handleDifficulty = (difficulty: 0 | 1 | 2): DifficultyProps => {
        const difficulties = {
            0: {
                difficulty: "easy",
                title: "Easy - Reminded in 1 hour",
                time: "1h",
                color: "#22C55E",
                flashcard: {
                    front: "In which year did World War II end?",
                    back: "The World War II ended in 1945.",
                },
            },
            1: {
                difficulty: "medium",
                title: "Medium - Reminded in 15 minutes",
                time: "15m",
                color: "#ECB424",
                flashcard: {
                    front: "Define the characteristics of a gas and provide an example.",
                    back: "A gas has no fixed shape or volume and fills the entire container it occupies. It can be compressed easily. An example of a gas is oxygen, which is present in the air we breathe.",
                },
            },
            2: {
                difficulty: "hard",
                title: "Hard - Reminded in 2 minutes",
                time: "2m",
                color: "#E24C4C",
                flashcard: {
                    front: "Explain the concept of superposition in quantum mechanics.",
                    back: "Superposition is a fundamental principle in quantum mechanics, stating that a particle can exist in multiple states or positions simultaneously until it is measured or observed. This is in contrast to classical physics, where objects have definite states. ",
                },
            },
        };
        return difficulties[difficulty] || difficulties[0];
    };

    return (
        <section className='w-full h-auto py-40 flex flex-col items-center gap-2 lg:gap-6'>
            <h2 className='text-4xl lg:text-6xl font-semibold text-center flex items-center gap-4 lg:gap-8'>
                Found the card question hard?
            </h2>
            <h3 className='text-xl lg:text-4xl  text-muted-foreground/70 font-semibold text-center'>
                Braincards will make you review it later.
            </h3>
            <div className='mt-14 flex flex-col items-center gap-6 px-2'>
                <h3 className='text-2xl lg:text-5xl text-muted-foreground font-semibold text-center'>
                    {handleDifficulty(difficulty).title}
                </h3>
                <Flashcard
                    className='font-medium w-full aspect-video'
                    front={handleDifficulty(difficulty).flashcard?.front as string}
                    back={handleDifficulty(difficulty).flashcard?.back as string}
                    color={handleDifficulty(difficulty).color}
                />

                <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
            </div>
        </section>
    );
}
