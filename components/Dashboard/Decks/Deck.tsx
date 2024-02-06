import { HTMLAttributes, forwardRef } from "react";
import { ISOdateConverter, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Deck } from "@prisma/client";
import CardsIcon from "@/public/svg/CardsIcon";
import { Badge } from "@/components/ui/badge";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

type DeckComponentProps = HTMLAttributes<HTMLDivElement> & {
    deck: Deck;
};

const DeckComponent = forwardRef<HTMLDivElement, DeckComponentProps>(
    ({ className, deck, ...props }, ref) => {
        const isDesktop = useMediaQuery("(min-width: 768px)");
        return (
            <div
                className={cn(
                    "w-full bg-card rounded-lg border-2 p-6 py-5 space-y-1 flex flex-col justify-between shadow-md",
                    className
                )}
                ref={ref}
                {...props}
            >
                <div className='space-y-1 w-auto'>
                    <div className=' w-full flex justify-between'>
                        <h3 className='text-xl font-semibold tracking-tight whitespace-nowrap truncate'>
                            <CardsIcon className='fill-foreground inline-block scale-75 -translate-y-1 mr-2' />
                            {deck.title}
                        </h3>
                        <div
                            id='color'
                            className='w-12 h-6 bg-accent rounded-full border-4 border-white shadow-md'
                        ></div>
                    </div>
                    <p className='text-sm text-muted-foreground whitespace-nowrap truncate'>
                        {deck.description}
                    </p>
                    <div className='flex gap-2'>
                        <Badge className='rounded-md'>15 cards</Badge>
                        <Badge className='rounded-md' variant={"outline"}>
                            Updated at:{" "}
                            {
                                ISOdateConverter(deck.updatedAt as unknown as string).split(
                                    isDesktop ? "." : " "
                                )[0]
                            }
                        </Badge>
                    </div>
                </div>
                <div className='h-full  flex flex-col justify-between'>
                    <div className='h-full bg-gradient-to-b from-transparent to-card'></div>
                    <Button
                        className='w-full mt-4 border-[2px] font-semibold border-neutral-200'
                        variant={"secondary"}
                    >
                        View deck <ArrowRight className='w-4 h-4 ml-2' />
                    </Button>
                </div>
            </div>
        );
    }
);

DeckComponent.displayName = "Deck";

export { DeckComponent };
