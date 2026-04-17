import { useEffect, useState } from "react";
import { useWeather } from "../../providers/WeatherProvider";

import WeatherIcon from "./WeatherIcon";
import CurrentWeatherSkeleton from "./skeletons/CurrentWeatherSkeleton";

import type { TWeather } from "../../types/types.ts";
import { weatherApi } from "../../api/api.ts";

const CurrentWeather = () => {
    const { currentCity, units } = useWeather();

    const [currentWeather, setCurrentWeather] = useState<TWeather | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (currentCity) {
            setIsLoading(true);
            const query = `${currentCity?.name},${currentCity?.country}`;

            weatherApi.fetchWeather(query, units)
                .then(res => {
                    setCurrentWeather(res);
                    setIsLoading(false);
                })
        }
    }, [currentCity, units]);

    return (
        <>
            {isLoading ? (
                // Show Current Weather Skeleton when loading data
                <CurrentWeatherSkeleton />
            ) : (
                <div className="flex flex-col gap-15 px-5 py-4 rounded-xl bg-blue-400/40 shadow-sm shadow-gray-200 min-w-95">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-xl">{`${currentWeather?.name}, ${currentWeather?.sys?.country}`}</h3>
                        <WeatherIcon icon={currentWeather?.weather?.[0]?.icon} className="size-17.5" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1 items-center">
                    <span className="font-semibold text-5xl">
                        {typeof currentWeather?.main?.temp !== "undefined" && Math.round(currentWeather?.main?.temp)}°
                    </span>
                        </div>

                        <div className="flex flex-col capitalize font-semibold items-center gap-1">
                            <span className="text-xl">{currentWeather?.weather?.[0]?.description}</span>
                            <span className="text-lg">
                                Feels like {typeof currentWeather?.main?.temp !== "undefined" && Math.round(currentWeather?.main?.feels_like)}°
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default CurrentWeather
