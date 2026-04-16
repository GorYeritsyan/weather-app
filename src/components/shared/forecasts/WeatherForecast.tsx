import { useEffect, useState } from "react";
import { useWeather } from "../../../providers/WeatherProvider.tsx";

import DailyForecast from "./DailyForecast.tsx";
import HourlyForecast from "./HourlyForecast.tsx";
import WeatherForecastSkeleton from "../skeletons/WeatherForecastSkeleton.tsx";

import { weatherApi } from "../../../api/api.ts";

const WeatherForecast = ({ cityName, countryName, selectedDay, onDayChange }) => {
    const { units } = useWeather();

    const [forecast, setForecast] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Group Forecast data by day
    const groupedForecast = forecast?.reduce((acc, item) => {
        const day = item?.dt_txt?.split(" ")[0];

        if (!acc[day]) acc[day] = [];
        acc[day].push(item);

        return acc;
    }, {});

    // Fetch 5 day / 3-hour forecast data
    useEffect(() => {
        if (cityName && countryName) {
            setIsLoading(true);
            const query = `${cityName},${countryName}`;

            weatherApi.fetchForecast(query, units)
                .then(data => {
                    setForecast(data.list);
                    setIsLoading(false);
                })
        }
    }, [units, cityName, countryName]);

    // Initialize selected day state
    useEffect(() => {
        if (groupedForecast) {
            const currentDay = Object.keys(groupedForecast)?.[0];

            if (!selectedDay) {
                onDayChange(currentDay);
            }
        }
    }, [forecast]);

    // Show Weather forecast skeleton when loading data
    if (isLoading) return (
        <WeatherForecastSkeleton />
    );

    // Show Error Message if there is no data
    if (!forecast) {
        return (
            <p className="text-lg font-semibold">Forecast data is not available for this location.</p>
        )
    }

    return (
        <div className="flex flex-col gap-5">
            {/* 5-Day Forecast */}
            <DailyForecast forecast={groupedForecast} selectedDay={selectedDay} onDayChange={onDayChange} />

            {/* 3-Hour forecast */}
            <HourlyForecast selectedDay={selectedDay} forecast={groupedForecast} />
        </div>
    );
}

export default WeatherForecast;