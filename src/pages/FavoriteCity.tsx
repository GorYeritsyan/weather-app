import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";

import WeatherForecast from "../components/shared/forecasts/WeatherForecast";
import Container from "../components/shared/Container";
import Button from "../components/ui/Button";

const FavoriteCity = () => {
    const { cityName, countryName } = useParams();
    const navigate = useNavigate();

    const [selectedDay, setSelectedDay] = useState<string | null>(null);

    function handleDayChange(day: string) {
        setSelectedDay(day);
    }

    function goBack() {
        navigate(-1);
    }

    return (
        <Container>
            <div className="py-10">
                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-4">
                        <Button onClick={goBack} variant="ghost">
                            <FaArrowLeftLong />
                            Go Back
                        </Button>
                        <h2 className="text-4xl font-semibold">{cityName}, {countryName}</h2>
                    </div>

                    {/* Weather Forecast */}
                    <WeatherForecast
                        cityName={cityName}
                        countryName={countryName}
                        selectedDay={selectedDay}
                        onDayChange={handleDayChange}
                    />
                </div>
            </div>
        </Container>
    );
}

export default FavoriteCity;