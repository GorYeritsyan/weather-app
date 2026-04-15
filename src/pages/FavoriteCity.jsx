import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";
import {weatherApi} from "../api/api.js";
import WeatherForecast from "../components/shared/WeatherForecast.jsx";
import {useWeather} from "../providers/WeatherProvider.jsx";
import Container from "../components/shared/Container.jsx";
import Button from "../components/ui/Button.jsx";

const FavoriteCity = () => {
    const navigate = useNavigate();
    const [selectedDay, setSelectedDay] = useState(null);

    function handleDayChange(day) {
        setSelectedDay(day);
    }

    const { cityName, countryName } = useParams();

    function goBack() {
        navigate(-1);
    }

    return (
        <Container>
            <div className="py-10">
                <div className="flex flex-col gap-8">
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="text-4xl font-semibold">{cityName}, {countryName}</h2>
                        <Button onClick={goBack} variant="ghost">
                            <FaArrowLeftLong />
                            Go Back
                        </Button>
                    </div>

                    {/* Weather Forecast */}
                    <WeatherForecast cityName={cityName} countryName={countryName} selectedDay={selectedDay} onDayChange={handleDayChange} />
                </div>
            </div>
        </Container>
    );
}

export default FavoriteCity;