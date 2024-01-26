"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Arrow from "@/public/Arrow.svg";
import { Brain, BrainCircuit, GalleryHorizontal, MousePointerClick, Sparkles } from "lucide-react";
import CardsIcon from "@/public/svg/CardsIcon";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";
import { type CarouselApi } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Flashcard, FlashcardFront, FlashcardBack } from "@/components/Flashcard";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";

const data = [
    {
        concept: "Cellular biology",
        details: "Ask about cell structure, organelles function and other stuff.",
        amount: 10,
        info: "",
        color: "#B6DC76",
        cards: [
            {
                front: "What is the basic structural and functional unit of all living organisms?",
                back: "Cell",
            },
            {
                front: "Name the three main parts of an eukaryotic cell.",
                back: "Cell membrane, cytoplasm, and nucleus",
            },
            {
                front: "Which type of cells contain a true nucleus and membrane-bound organelles?",
                back: "Eukaryotic cells",
            },
            {
                front: "What is the function of the cell membrane?",
                back: "It regulates the passage of substances into and out of the cell, providing a selective barrier.",
            },
            {
                front: "Which organelle is responsible for producing energy in the form of ATP in eukaryotic cells?",
                back: "Mitochondria",
            },
            {
                front: "What is the function of the endoplasmic reticulum (ER) in a cell?",
                back: "The ER is involved in the synthesis, folding, modification, and transport of proteins.",
            },
            {
                front: "Name the organelle responsible for detoxifying harmful substances and metabolizing drugs in liver cells.",
                back: "Smooth endoplasmic reticulum (Smooth ER)",
            },
            {
                front: "What is the primary function of the Golgi apparatus?",
                back: "It processes, packages, and distributes molecules, particularly proteins, within or outside the cell.",
            },
            {
                front: "Which cellular structure contains the genetic material (DNA) and controls cellular activities?",
                back: "Nucleus",
            },
            {
                front: "Differentiate between prokaryotic and eukaryotic cells.",
                back: "Prokaryotic cells lack a true nucleus and membrane-bound organelles, while eukaryotic cells have both a true nucleus and membrane-bound organelles.",
            },
        ],
    },
    {
        concept: "World War II",
        details: "Questions about the motivation, end, winners and who was affected by the WWII",
        amount: 8,
        info: "",
        color: "#e3e3e3",
        cards: [
            {
                front: "What were the motivations behind World War II?",
                back: "The motivations behind World War II were complex and varied among the different nations involved. Key factors included unresolved conflicts from World War I, economic and political challenges, and the rise of fascism in Europe.",
            },
            {
                front: "What was a significant motivational slogan during WWII?",
                back: "A significant motivational slogan during WWII was 'Keep Calm and Carry On', which became an iconic symbol of resilience.",
            },
            {
                front: "When did World War II end?",
                back: "World War II ended on September 2, 1945.",
            },
            {
                front: "Who were the winners of World War II?",
                back: "The main Allied powers, which consisted of the United States, Great Britain, China, and the Soviet Union, won World War II.",
            },
            {
                front: "Which countries were part of the Allies in World War II?",
                back: "The Allies in World War II included the United States, Soviet Union, Great Britain, China, and to a lesser extent, France.",
            },
            {
                front: "Which countries were part of the Axis in World War II?",
                back: "The Axis powers in World War II included Germany, Italy, and Japan.",
            },
            {
                front: "How many people died during World War II?",
                back: "An estimated 40,000,000 to 50,000,000 people died during World War II.",
            },
            {
                front: "Who were the non-Jewish victims of Nazi persecution during World War II?",
                back: "Non-Jewish victims of Nazi persecution included Slavic peoples, Roma and Sinti, Black people, mixed race people, communists, trade unionists, Soviet prisoners of war, Jehovah’s Witnesses, and people with disabilities.",
            },
        ],
    },
    {
        concept: "Javascript coding concepts",
        details: "Make questions about data types, recursive functions, callbacks...",
        amount: 12,
        info: "",
        color: "#facc15",
        cards: [
            {
                front: "What are the six primitive data types in Javascript?",
                back: "The six primitive data types are: string, number, boolean, null, undefined, and symbol.",
            },
            {
                front: "What is a recursive function and how can you write one in Javascript?",
                back: "A recursive function is a function that calls itself until a base case is reached. To write a recursive function in Javascript, you need to define the function, specify the base case and the recursive case, and call the function with an initial argument.",
            },
            {
                front: "What is a callback function and how can you use it in Javascript?",
                back: "A callback function is a function that is passed as an argument to another function and is executed after the other function finishes. ",
            },
            {
                front: "What is the difference between var, let, and const in Javascript?",
                back: "var, let, and const are keywords for declaring variables in Javascript. var has a function scope and can be reassigned. let has a block scope and can be reassigned. const has a block scope and cannot be reassigned.",
            },
            {
                front: "What is the difference between == and === in Javascript?",
                back: "The difference between == and === is the type coercion. == performs a loose equality check, which means it converts the operands to the same type before comparing them. === performs a strict equality check, which means it compares the operands without type conversion.",
            },
            {
                front: "What is the difference between a function declaration and a function expression in Javascript?",
                back: "A function declaration is a statement that defines a named function. A function expression is an expression that assigns an anonymous function to a variable or a property. ",
            },
            {
                front: "What is the difference between an array and an object in Javascript?",
                back: "An array is a special type of object that stores a collection of values in a sequential order. An object is a general type of data structure that stores a collection of key-value pairs. ",
            },
            {
                front: "What is the difference between a for loop and a while loop in Javascript?",
                back: "A for loop is a type of loop that executes a block of code for a specified number of times. A while loop is a type of loop that executes a block of code while a condition is true or false.",
            },
            {
                front: "What is the difference between a synchronous and an asynchronous code in Javascript?",
                back: "A synchronous code is a type of code that executes in a sequential order, which means each statement waits for the previous statement to finish before executing. An asynchronous code is a type of code that executes in a non-blocking manner, which means some statements can execute without waiting for the previous statements to finish. ",
            },
            {
                front: "What is the difference between a promise and an async/await in Javascript?",
                back: "A promise is an object that represents the eventual completion or failure of an asynchronous operation. An async/await is a syntactic sugar that makes working with promises easier and more readable. ",
            },
            {
                front: "What is the difference between a parameter and an argument in Javascript?",
                back: "A parameter is a variable that is declared in the function definition. An argument is a value that is passed to the function when it is invoked. ",
            },
            {
                front: "What is the difference between a return statement and a console.log statement in Javascript?",
                back: "A return statement is a statement that ends the execution of a function and returns a value to the caller. A console.log statement is a statement that prints a value to the console. ",
            },
        ],
    },
    {
        concept: "Essential formulas of physics",
        details: "Gimme cards about the essential formulas of dynamics",
        amount: 5,
        info: "",
        color: "#9CA3DB",
        cards: [
            {
                front: "Newton's Second Law",
                back: "F = m * a\nThe force acting on an object is equal to the mass of the object multiplied by its acceleration.",
            },
            {
                front: "Weight",
                back: "W = m * g\nThe weight of an object is equal to its mass multiplied by the acceleration due to gravity.",
            },
            {
                front: "Centripetal Force",
                back: "Fc = m * v^2 / r\nThe centripetal force required to keep an object moving in a circular path is proportional to the mass of the object, the square of its velocity, and inversely proportional to the radius of the circular path.",
            },
            {
                front: "Work-Energy Theorem",
                back: "W = ΔKE\nThe work done on an object is equal to the change in its kinetic energy.",
            },
            {
                front: "Impulse-Momentum Theorem",
                back: "J = Δp\nThe impulse applied to an object is equal to the change in its momentum.",
            },
        ],
    },
    {
        concept: "Country capitals",
        details: "Provide flashcards about the capitals of any countries.",
        amount: 9,
        info: "",
        color: "#F4E9CD",
        cards: [
            {
                front: "United States",
                back: "Washington, D.C.",
            },
            {
                front: "United Kingdom",
                back: "London",
            },
            {
                front: "France",
                back: "Paris",
            },
            {
                front: "Germany",
                back: "Berlin",
            },
            {
                front: "China",
                back: "Beijing",
            },
            {
                front: "India",
                back: "New Delhi",
            },
            {
                front: "Brazil",
                back: "Brasília",
            },
            {
                front: "Australia",
                back: "Canberra",
            },
            {
                front: "Japan",
                back: "Tokyo",
            },
        ],
    },
];

const PromptForm = ({
    card,
    color,
}: {
    card: { concept: string; details: string; amount: number; info: string };
    color: string;
}) => {
    return (
        <div className='relative flex flex-col p-6 bg-card/40 border-[1px] rounded-lg cursor-pointer '>
            <span className='font-semibold'>
                <CardsIcon className='inline-block mr-3 scale-75' fill='#000000' />
                {card.concept}
            </span>

            <Badge className='rounded-md ml-3 absolute right-0 mr-6'>{card.amount} Cards</Badge>
            <div className='mt-4 space-y-3'>
                <div>
                    <Label className='text-sm font-semibold'>Concept</Label>
                    <Input className='disabled:opacity-100 lg:w-96' value={card.concept} disabled />
                </div>
                <div>
                    <Label className='text-sm font-semibold'>Details</Label>
                    <Textarea
                        className='resize-none disabled:opacity-100 lg:w-96'
                        value={card.details}
                        disabled
                    />
                </div>
                <div>
                    <Label className='text-sm font-semibold'>Info source (optional)</Label>
                    <Textarea
                        placeholder='If you want, you can provider the source of the information that will be used on the cards here.'
                        className='resize-none disabled:opacity-100 lg:w-96 h-32'
                        value={card.info}
                        disabled
                    />
                </div>
                <div className='flex gap-3'>
                    <div>
                        <Label className='text-sm font-semibold'>Amount</Label>
                        <Select defaultValue={String(card.amount)} value={String(card.amount)}>
                            <SelectTrigger className='lg:w-[180px]'>
                                <SelectValue placeholder='Select a fruit' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Amount</SelectLabel>
                                    {Array.from({ length: 15 }).map((_, index) => (
                                        <SelectItem key={index} value={String(index + 1)}>
                                            {index + 1}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex flex-col justify-end'>
                        <Label className='text-sm font-semibold'>Color</Label>
                        <Button
                            variant={"outline"}
                            disabled
                            className='px-3 disabled:opacity-100 disabled:hover:cursor-not-allowed'
                        >
                            <div
                                className='h-full w-20 rounded-sm '
                                style={{ backgroundColor: color ? color : "e3e3e3" }}
                            ></div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Examples() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [generatedCards, setGeneratedCards] = useState<{ front: string; back: string }[]>();

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    useEffect(() => {
        if (current == 0) {
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setGeneratedCards(data[current - 1].cards);
        }, 2000);
    }, [current]);

    {
        /* <Flashcard className='w-[calc(50%-0.5rem)] h-56'>
            <FlashcardFront>Foo</FlashcardFront>
            <FlashcardBack>Bar</FlashcardBack>
        </Flashcard> */
    }

    return (
        <section
            id='examples'
            className='hidden lg:flex w-full py-14 max-w-[100rem] flex-col items-center space-y-4 '
        >
            <h2 className='font-heading text-3xl lg:text-4xl xl:text-6xl text-center '>
                Have an idea <Image src={Arrow} alt='' className='hidden lg:inline-block mx-4' />{" "}
                <br className='block lg:hidden' /> Get your flashcards
            </h2>
            <p className='text-xl lg:text-4xl text-muted-foreground font-semibold text-center'>
                The easiest workflow you can ever have.
            </p>
            <div className='w-full h-auto flex justify-center flex-wrap gap-10 py-14'>
                <div className='flex flex-col items-center px-12 '>
                    <h3 className='text-3xl font-semibold tracking-tight'>
                        Try any theme
                        <GalleryHorizontal className='ml-3 w-8 h-8 inline-block' />
                    </h3>
                    <Carousel
                        setApi={setApi}
                        className='w-80 lg:w-[calc(24rem+3rem)] mt-10'
                        plugins={[
                            Autoplay({
                                delay: 6000,
                                stopOnMouseEnter: true,
                                stopOnInteraction: true,
                                stopOnFocusIn: true,
                            }),
                        ]}
                    >
                        <CarouselContent>
                            {data.map((item, index) => (
                                <CarouselItem key={index}>
                                    <PromptForm card={item} color={item.color} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                    <div className='py-2 text-center text-sm text-muted-foreground'>
                        Example {current} of {count}
                    </div>
                </div>
                <div className='flex flex-col items-center w-1/2'>
                    <h3 className='text-3xl font-semibold tracking-tight flex'>
                        Get the best answers
                        <BrainCircuit className='ml-2 w-8 h-8 inline-block' />
                        <Badge className='text-base ml-2'>
                            <Sparkles className='mr-2' />
                            Pro feature
                        </Badge>
                    </h3>
                    <div className='w-full h-full max-h-[35rem] border-[1px] rounded-lg flex flex-wrap justify-center overflow-y-scroll overflow-x-hidden gap-2 mt-10 customscroll p-6 '>
                        <AnimatePresence>
                            {!loading
                                ? generatedCards?.map((card, index) => (
                                      <motion.a
                                          className='w-[calc(50%-0.5rem)]'
                                          initial={{ opacity: 0, scale: 0.8 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{ delay: index * 0.075 }}
                                          key={index}
                                      >
                                          <Flashcard className={`w-full h-56 `}>
                                              <FlashcardFront
                                                  className='text-sm'
                                                  color={data[current == 0 ? 1 : current - 1].color}
                                              >
                                                  {card.front}
                                              </FlashcardFront>
                                              <FlashcardBack
                                                  className='text-sm'
                                                  color={data[current == 0 ? 1 : current - 1].color}
                                              >
                                                  {card.back}
                                              </FlashcardBack>
                                          </Flashcard>
                                      </motion.a>
                                  ))
                                : Array.from({ length: 10 }).map((_, index) => (
                                      <motion.div
                                          initial={{ opacity: 0 }}
                                          className='w-[calc(50%-0.5rem)]'
                                          animate={{ opacity: 1 }}
                                          transition={{ delay: index * 0.075 }}
                                          key={index}
                                      >
                                          <Skeleton
                                              key={index}
                                              className={`w-full h-56 delay-${index * 100}`}
                                          />
                                      </motion.div>
                                  ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
