"use client";

import Image from "next/image";
import Outer from "../../public/Possibilities-Outer.svg";
import Middle from "../../public/Possibilities-Middle.svg";
import Inner from "../../public/Possibilities-Inner.svg";
import Cards from "../../public/Cards.svg";
import Logo from "@/public/svg/Caards_Logo.svg";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useGetScreenWidth } from "@/lib/hooks/useGetScreenWidth";

const Title = () => {
    const { screenWidth } = useGetScreenWidth();

    const subjects = [
        ["Math", "Psychology"],
        ["Art", "Anthropology"],
        ["Science", "Sociology"],
        ["History", "Astronomy"],
        ["Music", "Science"],
        ["Geography", "Statistics"],
        ["Biology", "Anatomy"],
        ["Medicine", "Ecology"],
        ["Chemistry", "Botany"],
        ["Physics", "Zoology"],
        ["Languages", "Geopolitics"],
        ["Philosophy", "Linguistics"],
        ["Literature", "Ethics"],
        ["Algebra", "Poetry"],
        ["Geometry", "Trigonometry"],
        ["Economics", "Calculus"],
    ];

    const [translated, setTranslated] = useState(0);

    useEffect(() => {
        const translateStep = () => {
            return screenWidth > 1024 ? 96 : 31;
        };
        if (translated !== -translateStep() * 16) {
            const interval = setInterval(() => {
                setTranslated(translated - translateStep());
            }, 1500);

            return () => clearInterval(interval);
        } else {
            setTranslated(0);
        }
    }, [translated, screenWidth]);

    useEffect(() => {
        setTranslated(0);
    }, [screenWidth]);

    return (
        <div className='text-center max-h-8 lg:max-h-24 overflow-clip '>
            {subjects.map((subject, index) => (
                <motion.h2
                    animate={{ y: translated }}
                    key={index}
                    className='text-[1.3rem] lg:text-[4rem] font-normal text-muted-foreground'
                >
                    From <span className='text-foreground font-semibold'>{subject[0]}</span> to{" "}
                    <span className='text-foreground font-semibold'>{subject[1]}</span>
                </motion.h2>
            ))}
        </div>
    );
};

export default function StudyingPossibilities() {
    return (
        <section className='h-[40vh] min-h-[21rem] lg:min-h-0 lg:h-[95vh] overflow-hidden relative w-full mt-10 lg:mt-32 xl:mt-10 flex justify-center '>
            <div id='title' className=' flex items-center flex-col'>
                <Image src={Cards} width={60} alt='' className='w-10 lg:w-24' />
                <Title />
                <h3 className='text-muted-foreground/60 text-center text-lg lg:text-4xl font-semibold'>
                    Unleash your memory across any theme
                </h3>
            </div>
            <div className='absolute w-full h-full  z-[4] bg-gradient-to-b from-transparent via-transparent to-background'></div>
            <Image
                className='absolute w-28 lg:w-72 bottom-10 left-1/2 -translate-x-1/2 z-[5]'
                src={Logo}
                width={500}
                alt='logo'
            />
            <div className='absolute left-1/2 -translate-x-[12.5rem] lg:-translate-x-[35rem] bottom-0 -translate-y-[12.5rem] lg:-translate-y-[35rem] bg-red-600 h-10'>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ ease: "linear", duration: 60, repeat: Infinity }}
                    className='absolute w-[25rem] lg:w-[70rem] '
                >
                    <Image src={Outer} alt='' />
                </motion.div>
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ ease: "linear", duration: 60, repeat: Infinity }}
                    className='absolute w-[25rem]  lg:w-[70rem] '
                >
                    <Image src={Middle} alt='' />
                </motion.div>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ ease: "linear", duration: 60, repeat: Infinity }}
                    className='absolute w-[25rem]  lg:w-[70rem] '
                >
                    <Image src={Inner} alt='' />
                </motion.div>
            </div>
        </section>
    );
}
