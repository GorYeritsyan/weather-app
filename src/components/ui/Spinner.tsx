import { LuLoaderCircle } from "react-icons/lu";
import { cn } from "../../utils";

const Spinner = ({ className }: { className?: string }) => {
    return (
        <div className="flex items-center justify-center">
            <LuLoaderCircle className={cn("size-14 animate-spin", className)} />
        </div>
    )
}

export default Spinner;