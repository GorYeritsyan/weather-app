import React from 'react'
import {useWeather} from "../../providers/WeatherProvider.jsx";
import {cn} from "../../utils/index.js";

const ToggleUnits = () => {
    const { units, changeToFahrenheit, changeToCelsius } = useWeather();

    return (
        <div className="flex items-center justify-between gap-2 rounded-full bg-blue-100 p-1 shadow-sm shadow-gray-200 border border-blue-200">
            <div
                onClick={changeToCelsius}
                className={cn("border border-blue-300 p-3 size-10 font-semibold text-sm rounded-full bg-blue-200 flex items-center justify-center cursor-pointer",
                    units === "metric" && "border-blue-400 bg-blue-500 text-white")}
            >
                ℃
            </div>

            <div
                onClick={changeToFahrenheit}
                className={cn("border border-blue-300 p-3 size-10 font-semibold text-sm rounded-full bg-blue-200 flex items-center justify-center cursor-pointer",
                    units === "imperial" && "border-blue-400 bg-blue-500 text-white")}
            >
                ℉
            </div>
        </div>
    )
}
export default ToggleUnits
