import React from 'react'

const ForecastCard = ({ currentWeather }) => {
    return (
        <div className="flex flex-col gap-15 p-5 rounded-xl bg-blue-400/40 shadow-sm shadow-gray-200 min-w-[380px]">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-xl">{`${currentWeather?.name}, ${currentWeather?.sys?.country}`}</h3>
                    <span className="font-semibold text-sm">{new Date().toLocaleTimeString()}</span>
                </div>
                <img className="size-[70px]" src={`https://openweathermap.org/payload/api/media/file/${currentWeather?.weather?.[0]?.icon}.png`} />
            </div>

            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1 items-center">
                            <span className="font-semibold text-5xl">
                                {Math.round(currentWeather?.main?.temp)}°
                            </span>
                </div>

                <div className="flex flex-col capitalize font-semibold items-center gap-1">
                    <span className="text-xl">{currentWeather?.weather?.[0]?.description}</span>
                    <span className="text-lg">Feels like {Math.round(currentWeather?.main?.feels_like)}°</span>
                </div>
            </div>
        </div>
    )
}
export default ForecastCard
