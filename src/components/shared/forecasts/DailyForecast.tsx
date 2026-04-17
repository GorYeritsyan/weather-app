import type { TGroupedForecast } from "../../../types/types.ts";
import DailyForecastCard from "./DailyForecastCard";

type DailyForecastProps = {
    forecast: TGroupedForecast;
    selectedDay: string | null;
    onDayChange: (selectedDay: string) => void;
};

const DailyForecast = ({ forecast, selectedDay, onDayChange }: DailyForecastProps) => {
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
