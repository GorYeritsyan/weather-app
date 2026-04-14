import DailyForecast from "./DailyForecast.jsx";
import HourlyForecast from "./HourlyForecast.jsx";

const WeatherForecast = ({ forecast, selectedDay, onDayChange }) => {
    return (
        <div className="flex flex-col gap-5">
            {/* 5-Day Forecast */}
            <DailyForecast dailyForecast={forecast} selectedDay={selectedDay} onDayChange={onDayChange} />

            {/* 3-Hour forecast */}
            <HourlyForecast selectedDay={selectedDay} hourlyForecast={forecast} />
        </div>
    );
}

export default WeatherForecast;