import { useEffect, useState } from "react";
import { useWeather } from "../providers/WeatherProvider.jsx";
import { weatherApi } from "../api/api.js";

import Container from "../components/shared/Container.jsx";
import HourlyForecast from "../components/shared/HourlyForecast.jsx";
import DailyForecast from "../components/shared/DailyForecast.jsx";
import ForecastCard from "../components/shared/ForecastCard.jsx";
import ToggleUnits from "../components/shared/ToggleUnits.jsx";
import Spinner from "../components/ui/Spinner.jsx";

const Home = () => {
    const { coordinates, currentWeather, isLoading, setIsLoading, units } = useWeather();

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
        if (coordinates) {
            setIsLoading(true);
            weatherApi.fetchWeather(`forecast?lat=${coordinates?.lat}&lon=${coordinates?.lon}&units=${units}`)
                .then(data => {
                    setForecast(data.list);
                    setIsLoading(false);
                });
        }
    }, [units, coordinates]);

    // Initialize selected day state
    useEffect(() => {
        const currentDay = Object.keys(groupedForecast)?.[0];

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
                <div className="flex items-center gap-4">
                    <h1 className="text-4xl font-bold">Weather Forecast</h1>

                    {/* Toggle between celsius and fahrenheit */}
                    <ToggleUnits />
                </div>

                {isLoading || !currentWeather || !groupedForecast ? (
                    <Spinner />
                ) : (
                    <div className="flex flex-col items-start gap-4">
                        {/* 5-Day Forecast */}
                        <DailyForecast dailyForecast={groupedForecast} selectedDay={selectedDay} onDayChange={handleDayChange} />

                        <div className="flex items-start gap-10">
                            <div className="flex items-center justify-center">
                                <div className="flex flex-col gap-3">
                                    <h3 className="font-semibold text-2xl">Current Weather</h3>

                                    {/* Current Weather details */}
                                    <ForecastCard />
                                </div>
                            </div>

                            {/* 3-Hour forecast */}
                            <HourlyForecast selectedDay={selectedDay} hourlyForecast={groupedForecast} />
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
}

export default Home;