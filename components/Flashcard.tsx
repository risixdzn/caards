// type Flashcard = {
//     front: string;
//     back: string;
// };

// function Flashcard({ front, back }: Flashcard) {
//     return <div className='w-96 h-52 bg-red-700 rounded-xl'></div>;
// }

// export default Flashcard;

"use client";

import type { ComponentType, MouseEventHandler } from "react";
import { motion, useSpring } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

// Learn more: https://www.framer.com/docs/guides/overrides/

//Spring animation parameters
const spring = {
    type: "spring",
    stiffness: 300,
    damping: 40,
};

/**
 * 3D Flip
 * Created By Joshua Guo
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */

type FlashcardProps = {
    front: string;
    back: string;
    className?: string;
    width?: number;
    height?: number;
    color?: string;
};

export default function Flashcard({
    front,
    back,
    className,
    width,
    height,
    color,
}: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped((prevState) => !prevState);
    };

    const [rotateXaxis, setRotateXaxis] = useState(0);
    const [rotateYaxis, setRotateYaxis] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const element = ref.current;
        const elementRect = element?.getBoundingClientRect();
        if (!elementRect) return;

        const elementWidth = elementRect.width;
        const elementHeight = elementRect.height;
        const elementCenterX = elementWidth / 2;
        const elementCenterY = elementHeight / 2;
        const mouseX = event.clientY - elementRect.y - elementCenterY;
        const mouseY = event.clientX - elementRect.x - elementCenterX;
        const degreeX = (mouseX / elementWidth) * 20; //The number is the rotation factor
        const degreeY = (mouseY / elementHeight) * 20; //The number is the rotation factor
        setRotateXaxis(degreeX);
        setRotateYaxis(degreeY);
    };

    const handleMouseEnd = () => {
        setRotateXaxis(0);
        setRotateYaxis(0);
    };

    const dx = useSpring(0, spring);
    const dy = useSpring(0, spring);

    useEffect(() => {
        dx.set(-rotateXaxis);
        dy.set(rotateYaxis);
    }, [rotateXaxis, rotateYaxis, dx, dy]);

    return (
        <motion.div
            id='wrapper'
            className={cn(
                className,
                "rounded-xl md:w-96 md:h-52 2xl:w-[30rem] 2xl:h-[16rem] relative"
            )}
            onClick={handleClick}
            transition={spring}
            style={{
                perspective: "1200px",
                transformStyle: "preserve-3d",
            }}
        >
            <motion.div
                id='hoverwrap'
                ref={ref}
                whileHover={{ scale: 1.05 }} //Change the scale of zooming in when hovering
                onMouseMove={(event: React.MouseEvent<HTMLDivElement>) => handleMouseMove(event)}
                onMouseLeave={() => handleMouseEnd()}
                transition={spring}
                style={{
                    width: "100%",
                    height: "100%",
                    rotateX: dx,
                    rotateY: dy,
                }}
            >
                <div
                    id='cards'
                    style={{
                        perspective: "1200px",
                        transformStyle: "preserve-3d",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <motion.div
                        id='front'
                        className={cn(
                            className,
                            `outline-2 outline-red-700 p-8 flex items-center justify-center rounded-xl`
                        )}
                        animate={{ rotateY: isFlipped ? -180 : 0 }}
                        transition={spring}
                        style={{
                            width: "100%",
                            height: "100%",
                            zIndex: isFlipped ? 0 : 1,
                            backfaceVisibility: "hidden",
                            position: "absolute",
                            background: `linear-gradient(90deg, #ffffff 0%, #ffffff 50%, ${
                                color ? color : "#FFB4E1"
                            } 100%)`,
                        }}
                    >
                        <div
                            id='border_overlay'
                            className='absolute rounded-xl border-2 border-border w-full h-full z-[4]'
                        ></div>
                        <div
                            id='squares_overlay'
                            className='absolute rounded-xl w-full h-full bg-hero-pattern2px bg-center bg-[length:32px] z-[1]'
                        >
                            <div
                                className={`w-full h-full rounded-xl `}
                                style={{
                                    background: `linear-gradient(270deg, rgba(255,255,255,0) 0%,  ${
                                        color ? color : "#FFB4E1"
                                    } 100%)`,
                                }}
                            ></div>
                        </div>
                        <span className='z-[3] text-center'>{front}</span>
                    </motion.div>
                    <motion.div
                        id='back'
                        className={cn(
                            className,
                            "flex items-center p-8 justify-center  rounded-xl"
                        )}
                        initial={{ rotateY: 180 }}
                        animate={{ rotateY: isFlipped ? 0 : 180 }}
                        transition={spring}
                        style={{
                            width: "100%",
                            height: "100%",
                            zIndex: isFlipped ? 1 : 0,
                            backfaceVisibility: "hidden",
                            position: "absolute",

                            background: `radial-gradient(at left top, rgb(255, 255, 255), rgb(255, 255, 255), ${
                                color ? color : "#FFB4E1"
                            })`,
                        }}
                    >
                        <div
                            id='border_overlay'
                            className='absolute rounded-xl border-2 border-border w-full h-full  z-[4]'
                        ></div>
                        <span className='text-center'>{back}</span>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}
