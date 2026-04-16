import { cn } from "../../../utils/index.js";
import WeatherIcon from "../WeatherIcon.jsx";

const DailyForecastCard = ({ dailyForecastDetails, selectedDay, onDayChange }) => {
    const [day, hours] = dailyForecastDetails;

    const dailyTemps = hours.map(hour => Math.round(hour?.main?.temp));
    const minTemp = Math.min(...dailyTemps);
    const maxTemp = Math.max(...dailyTemps);

    function getWeekDay(newDate) {
        const date = new Date(newDate).toDateString().split(" ");
        return `${date?.[0]} ${date?.[2]}`;
    }

    const weekDay = getWeekDay(day);
    const currentDay = getWeekDay(Date.now());

    const weatherIcon = hours?.[0]?.weather?.[0]?.icon;

    return (
        <div
            onClick={() => onDayChange(day)}
            className={cn("flex items-center justify-between gap-3 px-3 py-1 rounded-lg bg-blue-100 border border-blue-300 min-w-fit cursor-pointer",
                day === selectedDay && "bg-blue-600/80 border-blue-500 text-white")}
        >
            <div className="flex items-center gap-3 text-lg">
                <span className="font-semibold">
                    {weekDay === currentDay ? "Today" : weekDay}
                </span>

                <span className="font-semibold">
                    {minTemp}° - {maxTemp}°
                </span>
            </div>

            <WeatherIcon icon={weatherIcon} className="size-10" />
        </div>
    )
}
export default DailyForecastCard
