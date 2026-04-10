const HourlyForecastCard = ({ forecastDetails }) => {
    return (
        <div className="p-2 rounded-lg bg-blue-100 font-semibold">
            <span>{forecastDetails?.dt_txt?.split(" ")?.[1]}</span>
            <img src={`https://openweathermap.org/payload/api/media/file/${forecastDetails?.weather?.[0]?.icon}.png`} />
            {forecastDetails?.weather?.[0]?.description}
            <span>{forecastDetails?.main?.temp}</span> <br />
            <span>{forecastDetails?.main?.feels_like}</span>
        </div>
    );
}

export default HourlyForecastCard;