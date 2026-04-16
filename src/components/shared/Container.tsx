import type { ReactNode } from "react";
import { cn } from "../../utils";

const Container = ({ children, className }: {
    children?: ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("max-w-7xl mx-auto", className)}>
            {children}
        </div>
    )
}

export default Container;