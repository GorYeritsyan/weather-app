import { cn } from "../../utils/index.js";

const btnConfig = {
    base: "font-semibold text-blue-500 hover:text-blue-600 gap-3 active:bg-blue-200 cursor-pointer hover:bg-blue-100 px-3 py-1 rounded-full flex items-center justify-center",
    variants: {
        danger: "text-red-500 hover:text-red-600 active:bg-red-200 hover:bg-red-100",
        ghost: "text-gray-500 hover:text-gray-600 active:bg-gray-200 hover:bg-gray-100"
    }
}

const Button = ({ children, variant, className, ...props }) => {
    return (
        <button
            className={cn(
                btnConfig.base,
                btnConfig.variants?.[variant],
                className
            )}

            {...props}
        >
            {children}
        </button>
    );
}

export default Button;