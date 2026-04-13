import { cn } from "../../utils/index.js";

const Container = ({ children, className }) => {
    return (
        <div className={cn("max-w-7xl mx-auto", className)}>
            {children}
        </div>
    )
}

export default Container;