import { useEffect, useState } from "react";
import { useWeather } from "../providers/WeatherProvider.jsx";
import { weatherApi } from "../api/api.js";

import Container from "../components/shared/Container.jsx";
import ForecastCard from "../components/shared/ForecastCard.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import WeatherForecast from "../components/shared/WeatherForecast.jsx";

const Home = () => {
    const { currentCity, isWeatherLoading, isForecastLoading, setIsForecastLoading, units } = useWeather();

    const [forecast, setForecast] = useState([]);

    // Fetch 5 day / 3-hour forecast data
    useEffect(() => {
        if (currentCity) {
            const query = `${currentCity?.name},${currentCity?.country}`;

            setIsForecastLoading(true);
            weatherApi.fetchForecast(query, units)
                .then(data => {
                    setForecast(data.list);
                    setIsForecastLoading(false);
                })
        }
    }, [units, currentCity]);

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

                        <div className="flex flex-col gap-5">
                            <h2 className="text-3xl font-semibold">Weather Forecast</h2>

                            {/* Weather Forecast */}
                            <WeatherForecast forecast={forecast} />
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
}

export default Home;