import Image from "next/image";
import Cards from "../../public/Cards.svg";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ActivityIcon, Blocks, Sparkle, Workflow, Zap } from "lucide-react";

function Hero() {
    const squares_columns = new Array(32).fill(null);
    const squares_rows = new Array(15).fill(null);

    return (
        <section className='w-full h-[90vh] rounded-lg border-border border-[1px] relative overflow-clip flex items-center justify-center'>
            <div id='herocontent' className='z-[3] flex flex-col items-center gap-3'>
                <Badge
                    variant={"secondary"}
                    className='lg:h-8 lg:text-sm mb-2 lg:mb-0 hover:bg-white text-muted-foreground/50 border-border shadow-md bg-white'
                >
                    AI flashcards
                </Badge>
                <h1 className='text-center font-semibold tracking-tight leading-10 lg:leading-[5.5rem] text-[2.5rem] lg:text-[4.5rem]'>
                    Flash{" "}
                    <Image
                        src={Cards}
                        alt=''
                        width={120}
                        className='w-20 lg:w-32 inline-block -translate-y-2'
                    />{" "}
                    Cards
                    <br></br>powered by <span className='text-braincards'>AI</span>
                </h1>
                <p className='lg:text-xl text-muted-foreground max-w-[15rem] lg:max-w-md text-center'>
                    Study with ease by creating <b>flashcards</b> with the <b>power of AI</b>.
                </p>
                <div className='flex gap-6 mt-4 lg:mt-8'>
                    <Button
                        variant={"secondary"}
                        className='bg-white rounded-full lg:px-7 lg:text-xl lg:py-6 border-[1px] text-muted-foreground/70 shadow-md'
                    >
                        See more
                    </Button>
                    <Button
                        variant={"braincards"}
                        className='rounded-full lg:px-7 lg:text-xl lg:py-6 shadow-md'
                    >
                        Get started
                    </Button>
                </div>
                <div className='text-[0.8rem] text-muted-foreground flex items-center flex-col gap-4 mt-6'>
                    <div className='flex flex-wrap lg:gap-12 gap-4'>
                        <span className='flex gap-2 font-semibold'>
                            <Sparkle className='inline-block' />
                            Easy to use
                        </span>
                        <span className='flex gap-2 font-semibold'>
                            <Zap className='inline-block' />
                            Fast as light
                        </span>
                    </div>
                    <div className='flex flex-wrap lg:gap-12 gap-4 items-center justify-center px-10'>
                        <span className='flex gap-2 font-semibold'>
                            <Workflow className='inline-block' />
                            Accessible
                        </span>
                        <span className='flex gap-2 font-semibold'>
                            <Blocks className='inline-block' />
                            Customizable
                        </span>
                        <span className='flex gap-2 font-semibold'>
                            <ActivityIcon className='inline-block' />
                            Lightweight
                        </span>
                    </div>
                </div>
            </div>
            <div
                id='corner-gradient'
                className='hidden lg:block z-[2] absolute blur-[150px] w-[57rem] h-[44rem] rounded-[50%] bg-[#FFB4E1]
                bottom-0 translate-y-[40%] left-0 -translate-x-[40%]'
            ></div>
            <div
                id='middle-gradient'
                className='z-[2] absolute blur-[100px] lg:blur-[150px] w-[26rem] h-[44rem] rounded-[50%] bg-[#FFB4E1] lg:bg-[#FBD1EA]
                bottom-0 left-1/2 -translate-x-[50%] translate-y-[75%] lg:translate-y-[75%] '
            ></div>
            <div
                id='corner-gradient'
                className='hidden lg:block z-[2] absolute blur-[150px] w-[57rem] h-[44rem] rounded-[50%] bg-[#FFB4E1]
                bottom-0 right-0 translate-y-[40%] translate-x-[40%]'
            ></div>
            <div
                id='squarespattern'
                className='absolute w-full h-full bg-hero-pattern bg-center lg:bg-auto bg-[length:48px] z-[1]'
            ></div>
            <div
                id='bg-rounded-center-gradient'
                className=' blur-[40px] w-[14rem] h-[14rem] lg:w-[28rem] lg:h-[28rem] bg-braincards rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
            ></div>
        </section>
    );
}

export default Hero;
