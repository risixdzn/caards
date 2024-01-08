"use client";

import Image from "next/image";
import Cards from "../../public/Cards.svg";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";

type PlanCardProps = {
    title: string;
    description: string;
    price: number;
    originalPrice?: number;
    features: { label: string; included: boolean; bold?: boolean }[];
    cta: string;
    primary?: boolean;
};

const PlanCard = ({
    title,
    description,
    price,
    originalPrice,
    features,
    cta,
    primary,
}: PlanCardProps) => {
    const Feature = ({
        feature,
    }: {
        feature: { label: string; included: boolean; bold?: boolean };
    }) => {
        return (
            <span className='flex gap-3 items-center text-muted-foreground text-[0.925rem]'>
                {feature.included ? (
                    <div className={"w-[1.15rem] h-[1.15rem] rounded-full bg-braincards"}>
                        <Check className='scale-[0.6] text-white -translate-x-[0.14rem] -translate-y-[0.12rem]' />
                    </div>
                ) : (
                    <div className={"w-[1.15rem] h-[1.15rem] rounded-full "}>
                        <X className='scale-[0.6] text-destructive -translate-x-[0.14rem] -translate-y-[0.12rem]' />
                    </div>
                )}
                <b className={feature.bold ? "font-semibold" : "font-normal"}>{feature.label}</b>
            </span>
        );
    };

    return (
        <div
            className={`relative bg-white py-6 px-8 w-80 rounded-lg border-border shadow-lg ${
                primary && "outline outline-4 outline-braincards border-[0px]"
            }`}
        >
            <Image src={Cards} width={60} alt='' className='w-10 lg:w-14' />
            {primary && (
                <Badge className='absolute right-0 bg-braincards rounded-l-md rounded-r-none px-4 py-1 text-white font-semibold hover:bg-braincards'>
                    BEST OFFER
                </Badge>
            )}
            <div id='planinfo' className='mt-2 flex flex-col gap-1'>
                <h3 className='font-semibold text-[1.375rem]'>{title}</h3>
                <p className=' text-muted-foreground text-sm'>{description}</p>
                <div id='price' className='flex items-end py-2'>
                    <h2 className='text-[4rem] leading-[4rem] font-semibold'>${price}</h2>
                    {originalPrice && (
                        <h4 className='relative text-lg translate-x-2 text-muted-foreground'>
                            ${originalPrice}
                            <div
                                id='asd'
                                className='absolute -translate-y-4 w-full h-[1px] bg-muted-foreground -rotate-12'
                            ></div>
                        </h4>
                    )}
                </div>
            </div>
            <hr className='bg-muted-foreground mt-4'></hr>
            <h3 className='font-semibold text-[1.2rem] mt-4'>Features</h3>
            <div id='features' className='flex flex-col gap-3 mt-4'>
                {features.map((feature, index) => (
                    <Feature key={index} feature={feature} />
                ))}
            </div>
            <Button
                className={` mt-6 hover:bg-black/10 w-full bg-transparent border-muted-foreground border-2 text-muted-foreground ${
                    primary &&
                    "bg-braincards border-braincards-dark border-2 text-white hover:bg-braincards-dark"
                }`}
            >
                {cta}
            </Button>
        </div>
    );
};

const BillingCycleSelector = ({
    billingCycle,
    setBillingCycle,
    className,
}: {
    billingCycle: "monthly" | "yearly";
    setBillingCycle: Dispatch<SetStateAction<"monthly" | "yearly">>;
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
                    onClick={() => setBillingCycle("monthly")}
                    className={`rounded-full w-28 px-8 bg-transparent hover:bg-transparent  ${
                        billingCycle == "monthly" ? "text-white" : "text-muted-foreground"
                    }`}
                >
                    Monthly
                </Button>
                <Button
                    onClick={() => setBillingCycle("yearly")}
                    className={`rounded-full w-28 px-8 bg-transparent  hover:bg-transparent ${
                        billingCycle == "yearly" ? "text-white" : "text-muted-foreground"
                    }`}
                >
                    Yearly
                </Button>
            </div>
            <div
                className={`transition-all absolute bg-braincards w-28 h-10 rounded-full ${
                    billingCycle == "yearly" && "translate-x-[calc(100%+1rem)]"
                }`}
            ></div>
        </div>
    );
};

export default function Pricing() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

    const freePlanFeatures = [
        { label: "Flashcard Creating", included: true },
        { label: "Deck organizing", included: true },
        { label: "Color coding", included: true },
        { label: "AI Flashcard creator", included: false, bold: true },
        { label: "Unlimited creations", included: false },
        { label: "Import from other apps", included: false },
    ];
    const proPlanFeatures = [
        { label: "Flashcard Creating", included: true },
        { label: "Deck organizing", included: true },
        { label: "Color coding", included: true },
        { label: "AI Flashcard creator", included: true, bold: true },
        { label: "Unlimited creations", included: true },
        { label: "Import from other apps", included: true },
    ];

    return (
        <section
            id='pricing'
            className='w-full py-20 rounded-lg border-border border-[1px] relative overflow-clip flex items-center justify-center bg-gradient-to-br from-braincards via-background to-braincards'
        >
            <div id='content' className='z-[4] flex items-center flex-col gap-2 lg:gap-4'>
                <Image src={Cards} width={60} alt='' className='w-10 lg:w-16' />
                <h2 className='text-center text-4xl lg:text-6xl tracking-tight'>
                    All this, in <b className='font-semibold'>one plan</b>.
                </h2>
                <h3 className='text-xl lg:text-2xl max-w-lg text-center text-muted-foreground'>
                    Unlock boundless creativity at the <br className='lg:block hidden'></br>
                    <b className='font-semibold'> price of a meal</b>.
                </h3>
                <BillingCycleSelector
                    className='my-5'
                    billingCycle={billingCycle}
                    setBillingCycle={setBillingCycle}
                />
                <div id='plans' className='flex flex-wrap-reverse gap-8 justify-center'>
                    <PlanCard
                        title={"Basic"}
                        description={"Go-to for a first experience."}
                        price={0}
                        features={freePlanFeatures}
                        cta={"Try it for free"}
                    />
                    <PlanCard
                        title={"Pro"}
                        description={"Best way to unlock your full potential."}
                        price={billingCycle == "monthly" ? 10 : 120}
                        originalPrice={billingCycle == "monthly" ? 19.99 : 239.88}
                        features={proPlanFeatures}
                        cta={"Get started"}
                        primary
                    />
                </div>
            </div>
            <div
                id='bg-rounded-center-gradient'
                className='z-[2] blur-[120px] lg:blur-[200px] w-[28rem] h-[28rem] lg:w-[42rem] lg:h-[42rem] bg-braincards rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
            ></div>
            <div
                id='squarespattern'
                className='absolute w-full h-full bg-hero-pattern bg-center lg:bg-auto bg-[length:48px] z-[1]'
            ></div>
        </section>
    );
}
