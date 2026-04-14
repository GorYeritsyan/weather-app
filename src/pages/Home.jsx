import { useEffect, useState } from "react";
import { useWeather } from "../providers/WeatherProvider.jsx";
import { weatherApi } from "../api/api.js";

import Container from "../components/shared/Container.jsx";
import ForecastCard from "../components/shared/ForecastCard.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import WeatherForecast from "../components/shared/WeatherForecast.jsx";

const Home = () => {
    const { selectedCity, currentCity, currentWeather, isLoading, setIsLoading, units } = useWeather();

    const [selectedDay, setSelectedDay] = useState(null);
    const [forecast, setForecast] = useState([]);

    // Group Forecast data by day
    const groupedForecast = forecast?.reduce((acc, item) => {
        const day = item?.dt_txt?.split(" ")[0];

        if (!acc[day]) acc[day] = [];
        acc[day].push(item);

        return acc;
    }, {});

    // Fetch 5 day / 3-hour forecast data
    useEffect(() => {
        const query = selectedCity ? `${selectedCity?.name},${selectedCity?.country}` : `${currentCity?.name},${currentCity?.country}`;

        if (selectedCity || currentCity) {
            setIsLoading(true);
            weatherApi.fetchForecast(query, units)
                .then(data => {
                    setForecast(data.list);
                    setIsLoading(false);
                })
        }
    }, [units, selectedCity, currentCity]);

    // Initialize selected day state
    useEffect(() => {
        const currentDay = groupedForecast && Object.keys(groupedForecast)?.[0];

        if (!selectedDay) {
            setSelectedDay(currentDay);
        }
    }, [forecast]);

    // Function to select day
    function handleDayChange(day) {
        setSelectedDay(day);
    }

    return (
        <Container>
            <div className="flex flex-col py-10 gap-8">
                {isLoading || !currentWeather || !groupedForecast ? (
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
                            <WeatherForecast forecast={groupedForecast} selectedDay={selectedDay} onDayChange={handleDayChange} />
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
}

export default Home;