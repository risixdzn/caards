import { MousePointerClick } from "lucide-react";
import Flashcard from "../Flashcard";

export default function WhatIsAFlashcard() {
    return (
        <section className='relative flex flex-col gap-5 items-center lg:items-start justify-center w-full py-0 lg:py-10 mt-4 '>
            <div
                id='gradient_overlay'
                className='hidden lg:block pointer-events-none absolute w-full h-full lg:h-[calc(100%+6rem)] xl:h-full z-[4] bg-gradient-to-b from-transparent via-transparent to-background'
            ></div>
            <div className='z-[5] py-10 lg:py-20 xl:py-28 p-0 lg:p-20 xl:p-28 flex flex-col gap-5 items-start'>
                <h3 className='text-[1.25rem] lg:text-[1.5rem] xl:text-[2rem] font-semibold text-muted-foreground -mb-7 lg:-mb-8 xl:-mb-10'>
                    But first...
                </h3>
                <h2 className='text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[4rem] 2xl:text-[5rem] font-semibold tracking-tight'>
                    What is a flashcard?
                </h2>
                <p className='text-muted-foreground text-md  md:text-lg xl:text-2xl max-w-md lg:max-w-sm xl:max-w-md '>
                    Flashcards consist of a <b>question or concept on one side</b> and its
                    corresponding <b>answer or explanation on the other</b>.<br></br>
                    <br></br> They are <b>learning tools</b> designed to make <b>remembering</b>
                    things and <b>studying</b> efficient and enjoyable.
                </p>
                <h3 className='lg:mt-6 w-full lg:w-auto flex justify-end text-center lg:block  text-2xl md:text-3xl xl:text-6xl font-semibold tracking-tight mt-3'>
                    Click them to try!{" "}
                    <span className='ml-1 lg:ml-4 '>
                        <MousePointerClick className='scale-125 md:scale-150 xl:scale-[2.5] inline-block' />
                    </span>
                </h3>
            </div>
            <div
                id='flashcards'
                className=' -mt-8 lg:-mt-0 lg:absolute gap-4 flex-col lg:right-0 flex items-center justify-center lg:justify-normal w-full lg:w-1/2 h-auto lg:h-full '
            >
                <div
                    id='blockoverlay'
                    className='hidden lg:block w-full h-[calc(100%+1rem)] -translate-y-[1rem] bg-background absolute translate-x-[calc(100%)] z-[4]'
                ></div>

                <div className='ml-1/2 lg:ml-0 lg:translate-x-0 h-auto w-full lg:w-auto flex items-center flex-col gap-4 '>
                    <div className='flex items-center lg:items-baseline ml-1/2 lg:flex-row flex-col gap-4 xl:translate-x-1/4 flex-wrap lg:flex-none w-full '>
                        <Flashcard
                            width={30}
                            height={16}
                            className='w-full max-w-sm lg:max-w-none h-48 text-lg md:flex lg:hidden xl:flex 2xl:w-[30rem] 2xl:h-[16rem] '
                            front={"What historic event occurred on July 20, 1969?"}
                            back={
                                "The space flight, the lunar landing, and the crew's safe return to earth"
                            }
                        />
                        <Flashcard
                            width={30}
                            height={16}
                            className='w-full max-w-sm lg:max-w-none h-48 text-lg lg:translate-x-full xl:translate-x-0 2xl:w-[30rem] 2xl:h-[16rem] '
                            front={"What historic event occurred on July 20, 1969?"}
                            back={
                                "The space flight, the lunar landing, and the crew's safe return to earth"
                            }
                        />
                    </div>
                    <div className='hidden lg:flex gap-4 lg:-translate-x-0 xl:-translate-x-1/4 2xl:-translate-x-0'>
                        <Flashcard
                            width={30}
                            height={16}
                            className='text-lg lg:translate-x-1/2 lg:flex xl:hidden 2xl:flex 2xl:translate-x-0'
                            front={"What historic event occurred on July 20, 1969?"}
                            back={
                                "The space flight, the lunar landing, and the crew's safe return to earth"
                            }
                        />
                        <Flashcard
                            width={30}
                            height={16}
                            className=' text-lg flex 2xl:flex translate-x-0 lg:translate-x-1/2 xl:translate-x-3/4 2xl:translate-x-0'
                            front={"What historic event occurred on July 20, 1969?"}
                            back={
                                "The space flight, the lunar landing, and the crew's safe return to earth"
                            }
                        />
                    </div>
                    <div className='hidden lg:flex gap-4 xl:translate-x-1/4'>
                        <Flashcard
                            width={30}
                            height={16}
                            className='text-lg'
                            front={"What historic event occurred on July 20, 1969?"}
                            back={
                                "The space flight, the lunar landing, and the crew's safe return to earth"
                            }
                        />
                        <Flashcard
                            width={30}
                            height={16}
                            className='text-lg '
                            front={"What historic event occurred on July 20, 1969?"}
                            back={
                                "The space flight, the lunar landing, and the crew's safe return to earth"
                            }
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
