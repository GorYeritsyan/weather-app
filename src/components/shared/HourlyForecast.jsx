import HourlyForecastCard from "./HourlyForecastCard.jsx";

const HourlyForecast = ({ selectedDay, hourlyForecast }) => {
    return (
        <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-xl">Hourly Forecast</h3>

            <div className="flex gap-2 flex-wrap">
                {Object.entries(hourlyForecast)
                    .find(([day]) => day === selectedDay)?.[1]
                    .map((forecastItem) => (
                        <HourlyForecastCard
                            key={forecastItem?.dt}
                            forecastDetails={forecastItem}
                        />
                    ))}
            </div>
        </div>
    )
}
export default HourlyForecast
