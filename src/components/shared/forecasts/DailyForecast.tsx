import DailyForecastCard from "./DailyForecastCard.tsx";

const DailyForecast = ({ forecast, selectedDay, onDayChange }) => {
    return (
        <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-xl">Daily Forecast</h3>

            <div className="flex gap-2 w-full overflow-x-auto">
                {Object.entries(forecast)?.map((dailyForecastItem, index) => (
                    <DailyForecastCard
                        key={index}
                        dailyForecastDetails={dailyForecastItem}
                        selectedDay={selectedDay}
                        onDayChange={onDayChange}
                    />
                ))}
            </div>
        </div>
    )
}
export default DailyForecast
