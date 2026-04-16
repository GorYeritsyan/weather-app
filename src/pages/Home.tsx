import { useState } from "react";
import { useWeather } from "../providers/WeatherProvider.tsx";

import Container from "../components/shared/Container.tsx";
import CurrentWeather from "../components/shared/CurrentWeather.tsx";
import Spinner from "../components/ui/Spinner.tsx";
import WeatherForecast from "../components/shared/forecasts/WeatherForecast.tsx";

const Home = () => {
    const { currentCity, isLocationLoading } = useWeather();
    const [selectedDay, setSelectedDay] = useState<string | null>(null);

    function handleDayChange(day: string) {
        setSelectedDay(day);
    }

    return (
        <Container>
            <div className="flex flex-col py-10 gap-8">
                {isLocationLoading ? (
                    <Spinner />
                ) : (
                    <div className="flex flex-col items-start gap-10">
                        {/* Current Weather Details */}
                        <div className="flex flex-col gap-3">
                            <h3 className="font-semibold text-3xl">Current Weather</h3>

                            {/* Current Weather details */}
                            <CurrentWeather />
                        </div>

                        <div className="flex flex-col gap-5 w-full">
                            <h2 className="text-3xl font-semibold">Weather Forecast</h2>

                            {/* Weather Forecast */}
                            <WeatherForecast
                                cityName={currentCity?.name}
                                countryName={currentCity?.country}
                                selectedDay={selectedDay}
                                onDayChange={handleDayChange}
                            />
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
}

export default Home;