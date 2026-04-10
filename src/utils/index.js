import {twMerge} from "tailwind-merge";
import clsx from "clsx";

export const cn = (...classNames) => {
    return twMerge(clsx(...classNames))
}