import WeatherIcon from "./WeatherIcon.jsx";

const HourlyForecastCard = ({ forecastDetails }) => {

    function getDateString(date) {
        let hour = new Date(date).getHours();
        let minutes = new Date(date).getMinutes();
        let amPm = "AM";

        if (hour >= 12) {
            amPm = "PM";
            hour -= 12;
        }

        if (hour === 0) {
            hour = "12";
        }

        if (minutes === 0) {
            minutes = "00";
        }

        return `${hour}:${minutes} ${amPm}`;
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