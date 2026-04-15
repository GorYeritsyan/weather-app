import { useEffect, useState } from "react";
import DailyForecast from "./DailyForecast.jsx";
import HourlyForecast from "./HourlyForecast.jsx";
import {useWeather} from "../../providers/WeatherProvider.jsx";
import {weatherApi} from "../../api/api.js";
import WeatherForecastSkeleton from "./skeletons/WeatherForecastSkeleton.jsx";

const WeatherForecast = ({  cityName, countryName, selectedDay, onDayChange }) => {
    const [isLoading, setIsLoading] = useState(false);

    const [forecast, setForecast] = useState([]);
    const { units } = useWeather();

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

    // Group Forecast data by day
    const groupedForecast = forecast?.reduce((acc, item) => {
        const day = item?.dt_txt?.split(" ")[0];

        if (!acc[day]) acc[day] = [];
        acc[day].push(item);

        return acc;
    }, {});

    // Initialize selected day state
    useEffect(() => {
        const currentDay = groupedForecast && Object.keys(groupedForecast)?.[0];

        if (!selectedDay) {
            onDayChange(currentDay);
        }
    }, [forecast]);

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