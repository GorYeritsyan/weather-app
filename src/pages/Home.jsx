import { useEffect, useState } from "react";
import Container from "../components/shared/Container.jsx";
import HourlyForecast from "../components/shared/HourlyForecast.jsx";
import DailyForecast from "../components/shared/DailyForecast.jsx";
import ForecastCard from "../components/shared/ForecastCard.jsx";

const Home = () => {
    const [coordinates, setCoordinates] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);

    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/forecast?q=yerevan&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
            .then(res => res.json())
            .then(data => setForecast(data.list))
    }, []);

    // Group Forecast data by day
    const groupedForecast = forecast?.reduce((acc, item) => {
        const day = item?.dt_txt?.split(" ")[0];

        if (!acc[day]) acc[day] = [];
        acc[day].push(item);

        return acc;
    }, {});

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/weather?lat=${coordinates?.lat}&lon=${coordinates?.lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
            .then(res => res.json())
            .then(res => setCurrentWeather(res))
    }, [coordinates]);

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    function success(pos) {
        const crd = pos.coords;
        setCoordinates({ lat: crd?.latitude, lon: crd?.longitude });
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, error, options);
    }, []);

    function handleDayChange(day) {
        setSelectedDay(day);
    }

    return (
        <Container>
            <div className="flex flex-col items-start py-10 gap-4">
                <DailyForecast dailyForecast={groupedForecast} selectedDay={selectedDay} onDayChange={handleDayChange} />

                <div className="flex items-start gap-10">
                    <div className="flex items-center justify-center">
                        <ForecastCard currentWeather={currentWeather} />
                    </div>

                    <HourlyForecast selectedDay={selectedDay} hourlyForecast={groupedForecast} />
                </div>
            </div>
        </Container>
    );
}

export default Home;