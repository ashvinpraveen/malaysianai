import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface CTAButtonProps {
    children: ReactNode;
    variant?: "primary" | "secondary" | "white" | "outline";
    size?: "sm" | "md" | "lg";
    className?: string;
    href?: string;
    showArrow?: boolean;
    onClick?: () => void;
    isExternal?: boolean;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export const CTAButton = ({
    children,
    variant = "primary",
    size = "md",
    className,
    href,
    showArrow = true,
    onClick,
    isExternal = true,
    type = "button",
    disabled = false,
}: CTAButtonProps) => {
    const variantClasses = {
        primary: "border border-[#8e6100] bg-[#b78300] text-[#1f1405] shadow-[0_5px_0_hsl(var(--foreground)/0.2)] hover:-translate-y-0.5 hover:bg-[#c89100] hover:shadow-[0_7px_0_hsl(var(--foreground)/0.2)]",
        secondary: "border border-primary/35 bg-background/80 text-primary shadow-[0_3px_0_hsl(var(--foreground)/0.1)] hover:-translate-y-0.5 hover:bg-[#fff7e8] hover:shadow-[0_5px_0_hsl(var(--foreground)/0.12)]",
        white: "bg-background text-foreground border border-white/60 shadow-[0_5px_0_rgba(0,0,0,0.18)] hover:-translate-y-0.5 hover:bg-[#fff8eb] hover:shadow-[0_7px_0_rgba(0,0,0,0.16)]",
        outline: "border border-primary/25 bg-background/65 text-foreground hover:-translate-y-0.5 hover:border-primary/45 hover:bg-[#fff8eb]",
    };

    const sizeClasses = {
        sm: "px-5 h-9 text-sm",
        md: "px-6 h-11 text-sm",
        lg: "px-8 h-12 md:h-14 text-sm md:text-base",
    };

    const buttonClassName = cn(
        "group rounded-full font-semibold tracking-tight transition-all duration-200 h-auto",
        variantClasses[variant],
        sizeClasses[size],
        className
    );
    const buttonContent = (
        <>
            {children}
            {showArrow && (
                <ArrowRight
                    className={cn(
                        "ml-2 transition-all duration-300 ease-out",
                        size === "lg" ? "w-4 h-4" : "w-3.5 h-3.5",
                        "group-hover:translate-x-1.5"
                    )}
                />
            )}
        </>
    );

    if (href) {
        return (
            <Button asChild className={buttonClassName} onClick={onClick}>
                {isExternal ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex">
                        {buttonContent}
                    </a>
                ) : (
                    <Link href={href} className="inline-flex">
                        {buttonContent}
                    </Link>
                )}
            </Button>
        );
    }

    return (
        <Button
            type={type}
            disabled={disabled}
            className={buttonClassName}
            onClick={onClick}
        >
            {buttonContent}
        </Button>
    );
};
