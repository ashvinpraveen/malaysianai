import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface MainCTAButtonProps {
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

export const MainCTAButton = ({
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
}: MainCTAButtonProps) => {
    const variantClasses = {
        primary: "bg-dark-teal text-cream hover:bg-dark-teal/90 border border-dark-teal/10",
        secondary: "border border-dark-teal/40 bg-transparent text-dark-teal hover:bg-dark-teal/10",
        white: "bg-cream text-dark-teal hover:bg-cream/90 border border-dark-teal/15",
        outline: "border border-dark-teal/30 bg-transparent text-dark-teal hover:bg-dark-teal/5",
    };

    const sizeClasses = {
        sm: "px-5 h-9 text-sm",
        md: "px-6 h-11 text-sm",
        lg: "px-8 h-12 md:h-14 text-sm md:text-base",
    };

    const buttonElement = (
        <Button
            type={type}
            disabled={disabled}
            className={cn(
                "group rounded-md font-medium transition-all shadow-none h-auto",
                variantClasses[variant],
                sizeClasses[size],
                className
            )}
            onClick={onClick}
        >
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
        </Button>
    );

    if (href) {
        return (
            <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="inline-block"
            >
                {buttonElement}
            </a>
        );
    }

    return buttonElement;
};
