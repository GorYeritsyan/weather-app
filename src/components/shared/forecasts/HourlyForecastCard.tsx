import WeatherIcon from "../WeatherIcon";
import type { TWeather } from "../../../types/types.ts";

const HourlyForecastCard = ({ forecastDetails }: { forecastDetails: TWeather }) => {

    function getDateString(date: string | undefined) {
        if (typeof date !== "undefined") {
            let hour = new Date(date).getHours();
            let minutes = new Date(date).getMinutes();
            let amPm = hour >= 12 ? "PM" : "AM";

            // Hour can be only 12 AM - 12 PM
            hour = hour % 12 || 12;

            return `${hour}:${String(minutes).padStart(2, "0")} ${amPm}`;
        }
    }

    return (
        <div className="p-2 rounded-lg bg-blue-100 font-semibold w-fit min-w-37.5">
            <span>{getDateString(forecastDetails?.dt_txt)}</span>
            <div className="flex gap-2 items-center justify-between">
                <span className="text-2xl">{Math.round(forecastDetails?.main?.temp)}º</span>
                <WeatherIcon icon={forecastDetails?.weather?.[0]?.icon} className="size-14" />
            </div>
            <span className="text-lg">{forecastDetails?.weather?.[0]?.main}</span>
        </div>
    );
}

export default HourlyForecastCard;