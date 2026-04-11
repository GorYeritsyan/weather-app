const HourlyForecastCard = ({ forecastDetails }) => {
    return (
        <div className="p-2 rounded-lg bg-blue-100 font-semibold w-fit min-w-[150px]">
            <span>{new Date(forecastDetails?.dt_txt).toLocaleTimeString()}</span>
            <div className="flex gap-2 items-center justify-between">
                <span className="text-2xl">{Math.round(forecastDetails?.main?.temp)}º</span>
                <img className="size-[56px]" src={`https://openweathermap.org/payload/api/media/file/${forecastDetails?.weather?.[0]?.icon}.png`} />
            </div>
            <span className="text-lg">{forecastDetails?.weather?.[0]?.main}</span>
        </div>
    );
}

export default HourlyForecastCard;