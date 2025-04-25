import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-xs font-medium disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 transition-all",
    {
        variants: {
            color: {
                neutral: "text-neutral-400 border border-neutral-400/50 hover:bg-neutral-100",
                orange: "text-lion-orange border border-lion-orange/50 hover:bg-orange-50",
                destructive: "text-red-500 border border-red-400/50 hover:bg-red-50",
                primary: "text-white bg-neutral-800 hover:bg-neutral-900 border border-neutral-800",
                ghost: "text-neutral-500 border-none hover:bg-neutral-100",
            },
            padding: {
                sm: "px-3 py-1 text-xs",
                md: "px-3.5 py-1.5 text-xs",
                lg: "px-5 py-2 text-sm",
            },
            round: {
                sm: "rounded-sm",
                md: "rounded-md",
                lg: "rounded-lg",
                pill: "rounded-full",
            },
        },
        defaultVariants: {
            color: "primary",
            padding: "md",
            round: "lg",
        },
    }
);

export default function Button({
    className,
    color,
    padding,
    round,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ color, padding, round, className }))}
            {...props}
        />
    );
}
