import React from 'react'
import DailyForecastCard from "./DailyForecastCard.jsx";

const DailyForecast = ({ dailyForecast, selectedDay, onDayChange }) => {
    return (
        <div className="flex gap-2 w-full overflow-x-auto">
            {Object.entries(dailyForecast)?.map((dailyForecastItem) => (
                <DailyForecastCard dailyForecastDetails={dailyForecastItem} selectedDay={selectedDay} onDayChange={onDayChange} />
            ))}
        </div>
    )
}
export default DailyForecast
