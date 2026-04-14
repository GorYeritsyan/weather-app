import { useEffect, useState } from "react";
import DailyForecast from "./DailyForecast.jsx";
import HourlyForecast from "./HourlyForecast.jsx";

const WeatherForecast = ({ forecast }) => {
    const [selectedDay, setSelectedDay] = useState(null);

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
            setSelectedDay(currentDay);
        }
    }, [forecast]);

    // Function to select day
    function handleDayChange(day) {
        setSelectedDay(day);
    }

    return (
        <div className="flex flex-col gap-5">
            {/* 5-Day Forecast */}
            <DailyForecast dailyForecast={groupedForecast} selectedDay={selectedDay} onDayChange={handleDayChange} />

            {/* 3-Hour forecast */}
            <HourlyForecast selectedDay={selectedDay} hourlyForecast={groupedForecast} />
        </div>
    );
}

export default WeatherForecast;