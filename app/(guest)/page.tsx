import Image from "next/image";
import CaardsLogo from "@/public/Caards_TextLogo_Light.svg";
import Hero from "@/components/Home/Hero";
import WhatIsAFlashcard from "@/components/Home/WhatIsAFlashcard";
import StudyingPossibilities from "@/components/Home/StudyingPossibilities";
import Workflow from "@/components/Home/Workflow";
import Pricing from "@/components/Home/Pricing";
import Remember from "@/components/Home/Remember";
import Examples from "@/components/Home/Examples";

export default function Home() {
    return (
        <main className='customScrollbar flex min-h-screen flex-col items-center justify-between p-5 overflow-x-hidden'>
            <Hero />
            <WhatIsAFlashcard />
            <Workflow />
            <Examples />
            <StudyingPossibilities />
            <Remember />
            <Pricing />
        </main>
    );
}
