import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

const Heading = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
    ({ className, children, ...props }, ref) => {
        return (
            <h1 className={cn("text-4xl font-heading", className)} ref={ref} {...props}>
                {children}
            </h1>
        );
    }
);

Heading.displayName = "Heading";

const Description = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    ({ className, children, ...props }, ref) => {
        return (
            <p
                className={cn("text-md lg:text-lg text-muted-foreground", className)}
                ref={ref}
                {...props}
            >
                {children}
            </p>
        );
    }
);

Description.displayName = "Description";

export { Heading, Description };
