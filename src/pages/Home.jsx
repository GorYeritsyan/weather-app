import { useState } from "react";
import { useWeather } from "../providers/WeatherProvider.jsx";

import Container from "../components/shared/Container.jsx";
import ForecastCard from "../components/shared/ForecastCard.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import WeatherForecast from "../components/shared/WeatherForecast.jsx";

const Home = () => {
    const { currentCity, isWeatherLoading, isForecastLoading } = useWeather();
    const [selectedDay, setSelectedDay] = useState(null);

    function handleDayChange(day) {
        setSelectedDay(day);
    }

    return (
        <Container>
            <div className="flex flex-col py-10 gap-8">
                {isWeatherLoading || isForecastLoading ? (
                    <Spinner />
                ) : (
                    <div className="flex flex-col items-start gap-10">
                        {/* Current Weather Details */}
                        <div className="flex flex-col gap-3">
                            <h3 className="font-semibold text-3xl">Current Weather</h3>
                            {/* Current Weather details */}
                            <ForecastCard />
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