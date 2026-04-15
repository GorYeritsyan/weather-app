import { useEffect, useState } from "react";
import { useWeather } from "../../providers/WeatherProvider.jsx";

import DailyForecast from "./DailyForecast.jsx";
import HourlyForecast from "./HourlyForecast.jsx";
import WeatherForecastSkeleton from "./skeletons/WeatherForecastSkeleton.jsx";

import { weatherApi } from "../../api/api.js";

const WeatherForecast = ({  cityName, countryName, selectedDay, onDayChange }) => {
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
            const query = `${cityName},${countryName}`;

            setIsLoading(true);

            weatherApi.fetchForecast(query, units)
                .then(data => {
                    setForecast(data.list);
                    setIsLoading(false);
                })
        }
    }, [units, cityName, countryName]);

    // Initialize selected day state
    useEffect(() => {
        const currentDay = groupedForecast && Object.keys(groupedForecast)?.[0];

        if (!selectedDay) {
            onDayChange(currentDay);
        }
    }, [forecast]);

    // Show Weather forecast skeleton when loading data
    if (isLoading) return (
        <WeatherForecastSkeleton />
    );

    return (
        <div className="flex flex-col gap-5">
            {/* 5-Day Forecast */}
            <DailyForecast dailyForecast={groupedForecast} selectedDay={selectedDay} onDayChange={onDayChange} />

            {/* 3-Hour forecast */}
            <HourlyForecast selectedDay={selectedDay} hourlyForecast={groupedForecast} />
        </div>
    );
}

export default WeatherForecast;