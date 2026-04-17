import { useWeather } from "../../providers/WeatherProvider";
import { cn } from "../../utils";
import type { TUnits } from "../../types/types.ts";

const unitsList: { value: TUnits, label: string }[] = [
    {
        value: "metric",
        label: "℃"
    },
    {
        value: "imperial",
        label: "℉"
    }
];

const ToggleUnits = () => {
    const { units, changeUnits } = useWeather();

    return (
        <div className="flex items-center justify-between gap-2 rounded-full bg-blue-100 p-1 shadow-sm shadow-gray-200 border border-blue-200">
            {unitsList.map(unitsItem => (
                <div
                    key={unitsItem.value}
                    onClick={() => changeUnits(unitsItem.value)}
                    className={cn("border border-blue-300 p-3 size-10 font-semibold text-sm rounded-full bg-blue-200 flex items-center justify-center cursor-pointer",
                        units === unitsItem.value && "border-blue-400 bg-blue-500 text-white")}
                >
                    {unitsItem.label}
                </div>
            ))}
        </div>
    )
}
export default ToggleUnits
