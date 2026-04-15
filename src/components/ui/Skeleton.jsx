import { cn } from "../../utils/index.js";

const Skeleton = ({ className }) => {
    return (
        <div className={cn("min-h-6 w-full bg-gray-200 rounded-md animate-pulse", className)} />
    )
}

export default Skeleton;