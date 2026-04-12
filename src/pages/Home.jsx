import { useEffect, useState } from "react";
import Container from "../components/shared/Container.jsx";
import HourlyForecast from "../components/shared/HourlyForecast.jsx";
import DailyForecast from "../components/shared/DailyForecast.jsx";
import ForecastCard from "../components/shared/ForecastCard.jsx";
import {useWeather} from "../providers/WeatherProvider.jsx";
import ToggleUnits from "../components/shared/ToggleUnits.jsx";
import { LuLoaderCircle } from "react-icons/lu"

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

const Home = () => {
    const [coordinates, setCoordinates] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);

    const { selectedCity } = useWeather();

    const [isLocationLoading, setIsLocationLoading] = useState(false);

    const { units } = useWeather();

    const [forecast, setForecast] = useState([]);

    function handleLocationSuccess(pos) {
        if (selectedCity) {
            setCoordinates({ lat: selectedCity?.lat, lon: selectedCity?.lon });
            setIsLocationLoading(false);
            return;
        }

        const crd = pos.coords;
        setCoordinates({ lat: crd?.latitude, lon: crd?.longitude });
        setIsLocationLoading(false);
    }

    function handleLocationError(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        setIsLocationLoading(false);
    }

    useEffect(() => {
        if (coordinates) {
            fetch(`${import.meta.env.VITE_BASE_URL}/forecast?lat=${coordinates?.lat}&lon=${coordinates?.lon}&units=${units}&appid=${import.meta.env.VITE_API_KEY}`)
                .then(res => res.json())
                .then(data => setForecast(data.list))
        }
    }, [units, coordinates]);

    useEffect(() => {
        if (coordinates) {
            fetch(`${import.meta.env.VITE_BASE_URL}/weather?lat=${coordinates?.lat}&lon=${coordinates?.lon}&units=${units}&appid=${import.meta.env.VITE_API_KEY}`)
                .then(res => res.json())
                .then(res => setCurrentWeather(res));
        }
    }, [coordinates, units]);

    useEffect(() => {
        const currentDay = Object.keys(groupedForecast)?.[0];

        if (!selectedDay) {
            setSelectedDay(currentDay);
        }
    }, [forecast]);

    useEffect(() => {
        setIsLocationLoading(true);
        navigator.geolocation.getCurrentPosition(handleLocationSuccess, handleLocationError, options);
    }, []);

    // Group Forecast data by day
    const groupedForecast = forecast?.reduce((acc, item) => {
        const day = item?.dt_txt?.split(" ")[0];

        if (!acc[day]) acc[day] = [];
        acc[day].push(item);

        return acc;
    }, {});

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

                {isLocationLoading || !currentWeather || !groupedForecast ? (
                    <div className="flex items-center justify-center">
                        <LuLoaderCircle className="size-14 animate-spin" />
                    </div>
                ) : (
                    <div className="flex flex-col items-start gap-4">
                        {/* 5 Day Forecast */}
                        <DailyForecast dailyForecast={groupedForecast} selectedDay={selectedDay} onDayChange={handleDayChange} />

                        <div className="flex items-start gap-10">
                            <div className="flex items-center justify-center">
                                <div className="flex flex-col gap-3">
                                    <h3 className="font-semibold text-2xl">Current Weather</h3>

                                    {/* Current Weather details */}
                                    <ForecastCard currentWeather={currentWeather} />
                                </div>
                            </div>

                            {/* 3 Hour forecast */}
                            <HourlyForecast selectedDay={selectedDay} hourlyForecast={groupedForecast} />
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
}

export default Home;