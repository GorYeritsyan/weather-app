import DailyForecastCard from "./DailyForecastCard.jsx";

const DailyForecast = ({ dailyForecast, selectedDay, onDayChange }) => {
    console.log(dailyForecast);

    return (
        <div className="flex gap-2 w-full overflow-x-auto">
            {Object.entries(dailyForecast)?.map((dailyForecastItem, index) => (
                <DailyForecastCard
                    key={index}
                    dailyForecastDetails={dailyForecastItem}
                    selectedDay={selectedDay}
                    onDayChange={onDayChange}
                />
            ))}
        </div>
    )
}
export default DailyForecast
