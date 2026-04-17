import HourlyForecastCard from "./HourlyForecastCard";
import type { TWeather } from "../../../types/types.ts";

type HourlyForecastProps = {
    selectedDay: string | null;
    forecast: { [key: string]: TWeather[] };
};

const HourlyForecast = ({ selectedDay, forecast }: HourlyForecastProps) => {
    const hourlyForecast: TWeather[] = selectedDay ? forecast?.[selectedDay] : [];

    return (
        <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-xl">Hourly Forecast</h3>

            <div className="flex gap-2 flex-wrap">
                {hourlyForecast?.map((forecastItem) => (
                    <HourlyForecastCard
                        key={forecastItem.dt}
                        forecastDetails={forecastItem}
                    />
                ))}
            </div>
        </div>
    )
}

export default HourlyForecast
