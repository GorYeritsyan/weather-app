import { cn } from "../../utils/index.js";
import WeatherIcon from "./WeatherIcon.jsx";

const DailyForecastCard = ({ dailyForecastDetails, selectedDay, onDayChange }) => {
    const [day, hours] = dailyForecastDetails;

    function getWeekDay(date) {
        return new Date(date).toDateString().split(" ")?.[0];
    }

    const weekDay = getWeekDay(day);
    const currentDay = getWeekDay(Date.now());

    const weatherIcon = hours?.[0]?.weather?.[0]?.icon;
    const averageTemp = Math.round(hours?.reduce((acc, forecast) => acc + forecast?.main?.temp, 0) / hours?.length);

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
                    {averageTemp}°
                </span>
            </div>

            <WeatherIcon icon={weatherIcon} className="size-10" />
        </div>
    )
}
export default DailyForecastCard
