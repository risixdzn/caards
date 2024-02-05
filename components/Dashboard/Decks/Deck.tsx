import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Deck = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                className={cn("w-full bg-card rounded-lg border-2 p-6 py-5 space-y-1", className)}
                ref={ref}
                {...props}
            >
                {children}
                <div>
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

Deck.displayName = "Deck";

export { Deck };
